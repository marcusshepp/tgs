import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { CmsMenuItem } from '../models/cms.types';
import { StoreService, PricingResponse } from './store.service';

export interface LineItem {
    itemId: string;
    slug: string;
    name: string;
    unitPrice: number;
    quantity: number;
    customizations: Record<string, string[]>;
    customizationSummary: string;
}

export interface CartState {
    eventSlug: string | null;
    items: Record<string, LineItem>;
}

export interface PricingBreakdownLine {
    type: 'fee' | 'tax';
    label: string;
    amountCents: number;
}

export interface PricingBreakdown {
    subtotalCents: number;
    feeCents: number;
    taxCents: number;
    totalCents: number;
    lines: PricingBreakdownLine[];
}

interface StoredData {
    currentSlug: string | null;
    carts: Record<string, Record<string, LineItem>>;
}

const STORAGE_KEY = 'tgs_order_cart_v1';
const MAX_QTY = 99;

// Pure integer-math pricing — MUST match the Lambda implementation at
// sync.infra/lambda/portal/store/index.js `computePricing`. Duplicated
// intentionally (no shared runtime). If this formula diverges from the
// server, the cart preview and Stripe charge drift, which breaks customer
// trust. Covered by the fixtures in cart.service.spec.ts.
export function computePricing(
    subtotalCents: number,
    pricing: PricingResponse | null,
): { feeCents: number; taxCents: number; totalCents: number } {
    if (!pricing) {
        return { feeCents: 0, taxCents: 0, totalCents: subtotalCents };
    }
    const fee = pricing.onlineFee;
    const tax = pricing.salesTax;

    let feeCents = 0;
    if (fee.enabled) {
        feeCents = Math.round((subtotalCents * fee.percentBps) / 10000) + fee.flatCents;
    }

    let taxCents = 0;
    if (tax.enabled) {
        const taxBase =
            subtotalCents + (fee.enabled && fee.taxable ? feeCents : 0);
        taxCents = Math.round((taxBase * tax.percentBps) / 10000);
    }

    return {
        feeCents,
        taxCents,
        totalCents: subtotalCents + feeCents + taxCents,
    };
}

function isValidStoredData(value: unknown): value is StoredData {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }
    const v = value as Record<string, unknown>;
    if (typeof v['carts'] !== 'object' || v['carts'] === null || Array.isArray(v['carts'])) {
        return false;
    }
    return true;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private readonly state$ = new BehaviorSubject<CartState>({
        eventSlug: null,
        items: {},
    });

    private allCarts: Record<string, Record<string, LineItem>> = {};

    readonly items$: Observable<LineItem[]> = this.state$.pipe(
        map(s => Object.values(s.items)),
    );

    readonly totalQty$: Observable<number> = this.state$.pipe(
        map(s => Object.values(s.items).reduce((acc, item) => acc + item.quantity, 0)),
    );

    readonly totalPrice$: Observable<number> = this.state$.pipe(
        map(s => Object.values(s.items).reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)),
    );

    readonly isEmpty$: Observable<boolean> = this.totalQty$.pipe(
        map(qty => qty === 0),
    );

    // Pricing config (tax + fee) fetched on browser init. Null until the
    // first successful /store/pricing response. UI renders just the
    // subtotal/total rows while null — same degraded state used when the
    // tenant has both disabled.
    private readonly pricing$ = new BehaviorSubject<PricingResponse | null>(null);

    readonly breakdown$: Observable<PricingBreakdown> = combineLatest([
        this.totalPrice$,
        this.pricing$,
    ]).pipe(
        map(([totalDollars, pricing]) => {
            const subtotalCents = Math.round(totalDollars * 100);
            const { feeCents, taxCents, totalCents } = computePricing(
                subtotalCents,
                pricing,
            );
            const lines: PricingBreakdownLine[] = [];
            if (pricing?.onlineFee.enabled && feeCents > 0) {
                lines.push({
                    type: 'fee',
                    label: pricing.onlineFee.label,
                    amountCents: feeCents,
                });
            }
            if (pricing?.salesTax.enabled && taxCents > 0) {
                lines.push({
                    type: 'tax',
                    label: pricing.salesTax.label,
                    amountCents: taxCents,
                });
            }
            return { subtotalCents, feeCents, taxCents, totalCents, lines };
        }),
    );

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private storeService: StoreService,
    ) {
        this.loadFromStorage();
        // Fetch pricing config on init. Server-side render skips — there's no
        // fetch() there. First real pricing fetch happens when the component
        // hydrates in the browser.
        if (isPlatformBrowser(this.platformId)) {
            void this.fetchPricing();
        }
    }

    private async fetchPricing(): Promise<void> {
        try {
            const pricing = await this.storeService.getPricing();
            this.pricing$.next(pricing);
        } catch (err) {
            console.warn('[cart.service] pricing fetch failed', err);
            // Leave pricing$ as null → cart falls back to subtotal-only.
        }
    }

    private loadFromStorage(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return;
            }
            const parsed: unknown = JSON.parse(raw);
            if (!isValidStoredData(parsed)) {
                localStorage.removeItem(STORAGE_KEY);
                return;
            }
            this.allCarts = parsed.carts as Record<string, Record<string, LineItem>>;
            if (parsed.currentSlug && this.allCarts[parsed.currentSlug]) {
                this.state$.next({
                    eventSlug: parsed.currentSlug,
                    items: { ...this.allCarts[parsed.currentSlug] },
                });
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    private saveToStorage(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const state = this.state$.getValue();
        if (state.eventSlug) {
            this.allCarts[state.eventSlug] = state.items;
        }
        const stored: StoredData = {
            currentSlug: state.eventSlug,
            carts: this.allCarts,
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch {
            // quota exceeded — ignore
        }
    }

    addItem(menuItem: CmsMenuItem, eventSlug: string): void {
        const current = this.state$.getValue();
        let items = current.items;

        if (current.eventSlug !== eventSlug) {
            if (current.eventSlug) {
                this.allCarts[current.eventSlug] = current.items;
            }
            items = this.allCarts[eventSlug] ? { ...this.allCarts[eventSlug] } : {};
        }

        const existing = items[menuItem.slug];
        if (existing) {
            items = {
                ...items,
                [menuItem.slug]: {
                    ...existing,
                    quantity: Math.min(existing.quantity + 1, MAX_QTY),
                },
            };
        } else {
            items = {
                ...items,
                [menuItem.slug]: {
                    itemId: menuItem.slug,
                    slug: menuItem.slug,
                    name: menuItem.name,
                    unitPrice: menuItem.price,
                    quantity: 1,
                    customizations: {},
                    customizationSummary: '',
                },
            };
        }

        this.state$.next({ eventSlug, items });
        this.saveToStorage();
    }

    removeItem(menuItemSlug: string): void {
        const current = this.state$.getValue();
        const items = Object.fromEntries(
            Object.entries(current.items).filter(([key]) => key !== menuItemSlug),
        );
        this.state$.next({ ...current, items });
        this.saveToStorage();
    }

    updateQty(menuItemSlug: string, qty: number): void {
        if (qty <= 0) {
            this.removeItem(menuItemSlug);
            return;
        }
        const current = this.state$.getValue();
        const item = current.items[menuItemSlug];
        if (!item) {
            return;
        }
        this.state$.next({
            ...current,
            items: {
                ...current.items,
                [menuItemSlug]: { ...item, quantity: Math.min(qty, MAX_QTY) },
            },
        });
        this.saveToStorage();
    }

    clear(): void {
        const current = this.state$.getValue();
        this.state$.next({ ...current, items: {} });
        this.saveToStorage();
    }

    getItems(): Observable<LineItem[]> {
        return this.items$;
    }

    getTotal(): Observable<number> {
        return this.totalPrice$;
    }

    getItemCount(): Observable<number> {
        return this.totalQty$;
    }

    getEventSlug(): string | null {
        return this.state$.getValue().eventSlug;
    }

    updateCustomization(slug: string, groupId: string, values: string[]): void {
        const current = this.state$.getValue();
        const item = current.items[slug];
        if (!item) {
            return;
        }
        const updatedCustomizations = { ...item.customizations, [groupId]: values };
        const summary = Object.values(updatedCustomizations)
            .filter(v => v.length > 0)
            .flatMap(v => v)
            .join(', ');
        this.state$.next({
            ...current,
            items: {
                ...current.items,
                [slug]: { ...item, customizations: updatedCustomizations, customizationSummary: summary },
            },
        });
        this.saveToStorage();
    }
}
