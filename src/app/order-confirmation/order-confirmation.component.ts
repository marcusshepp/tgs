import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LineItem, CartService } from '../services/cart.service';
import { CmsService } from '../services/cms.service';
import { StoreService, OrderBySessionResponse } from '../services/store.service';
import { CmsOrderUi, CmsEvent } from '../models/cms.types';
import { CustomerInfo } from '../checkout/checkout.component';

interface PendingOrder {
    orderId: string;
    items: LineItem[];
    total: number;
    customer: CustomerInfo;
    eventSlug: string | null;
    placedAt: string;
}

// Unified view for the template — either branch (sessionStorage or API)
// normalizes into this shape so the HTML has one code path.
interface ConfirmationView {
    orderId: string;
    items: Array<{ name: string; quantity: number; lineTotal: number }>;
    total: number;
    customerName: string | null;
    pickupInstructions: string | null;
    eventName: string | null;
    eventDate: string | null;
    pickupLocation: string | null;
    pickupStartAt: string | null;
    pickupEndAt: string | null;
}

const POLL_DELAYS_MS = [1000, 2000, 4000, 6000];

@Component({
    selector: 'app-order-confirmation',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './order-confirmation.component.html',
    styleUrl: './order-confirmation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
    view: ConfirmationView | null = null;
    isLoading = false;
    hasError = false;
    orderUi: CmsOrderUi = {
        eventsListTitle: '',
        noUpcomingEventsMessage: '',
        orderPageHeading: '',
        cartEmptyMessage: '',
        checkoutHeading: '',
        submitButtonLabel: '',
        confirmationHeading: "Order's In!",
        confirmationMessage: '',
    };

    sessionId: string | null = null;

    private destroy$ = new Subject<void>();

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
        private cms: CmsService,
        private store: StoreService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.cms.getOrderUi().pipe(takeUntil(this.destroy$)).subscribe(ui => {
            this.orderUi = ui;
            this.cdr.markForCheck();
        });

        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

        // Preferred path: the checkout component wrote a pending-order snapshot to
        // sessionStorage right before the Stripe redirect. This lets us render
        // immediately without waiting for the webhook.
        const raw = sessionStorage.getItem('tgs-pending-order');
        if (raw) {
            try {
                const pending = JSON.parse(raw) as PendingOrder;
                this.view = this.fromPending(pending);
                this.cartService.clear();
                sessionStorage.removeItem('tgs-pending-order');
                this.cdr.markForCheck();

                // Hydrate pickup details from CMS since the snapshot only has
                // eventSlug. Non-blocking — page already rendered.
                if (pending.eventSlug) {
                    this.cms.getEventBySlug(pending.eventSlug).pipe(
                        takeUntil(this.destroy$),
                        catchError(() => of(null)),
                    ).subscribe(event => {
                        if (event && this.view) {
                            this.view = this.mergeEvent(this.view, event);
                            this.cdr.markForCheck();
                        }
                    });
                }
                return;
            } catch {
                sessionStorage.removeItem('tgs-pending-order');
            }
        }

        // Fallback path: no sessionStorage (customer refreshed, returned on
        // another device, etc). If Stripe redirected us with a session_id we
        // can hydrate from the server webhook once it catches up.
        if (this.sessionId) {
            this.hydrateFromServer(this.sessionId, 0);
            return;
        }

        this.router.navigate(['/']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private fromPending(p: PendingOrder): ConfirmationView {
        return {
            orderId: p.orderId,
            items: p.items.map(i => ({
                name: i.name,
                quantity: i.quantity,
                lineTotal: i.unitPrice * i.quantity,
            })),
            total: p.total,
            customerName: p.customer.name || null,
            pickupInstructions: p.customer.pickupInstructions || null,
            eventName: null,
            eventDate: null,
            pickupLocation: null,
            pickupStartAt: null,
            pickupEndAt: null,
        };
    }

    private mergeEvent(view: ConfirmationView, event: CmsEvent): ConfirmationView {
        return {
            ...view,
            eventName: event.name || view.eventName,
            eventDate: event.date || view.eventDate,
            pickupLocation: event.pickupLocation || event.location || view.pickupLocation,
            pickupStartAt: event.pickupStartAt || view.pickupStartAt,
            pickupEndAt: event.pickupEndAt || view.pickupEndAt,
        };
    }

    private fromServer(resp: OrderBySessionResponse): ConfirmationView {
        const o = resp.order;
        return {
            orderId: o.orderId,
            items: o.items.map(i => ({
                name: i.name || 'Item',
                quantity: i.quantity,
                lineTotal: i.lineTotalCents / 100,
            })),
            total: o.total,
            customerName: null,
            pickupInstructions: o.pickupInstructions,
            eventName: o.eventName,
            eventDate: o.eventDate,
            pickupLocation: o.pickupLocation,
            pickupStartAt: o.pickupStartAt,
            pickupEndAt: o.pickupEndAt,
        };
    }

    private async hydrateFromServer(sessionId: string, attempt: number): Promise<void> {
        if (this.destroy$.closed) return;
        this.isLoading = true;
        this.cdr.markForCheck();

        try {
            const resp = await this.store.getOrderBySession(sessionId);
            if (resp) {
                this.view = this.fromServer(resp);
                this.isLoading = false;
                this.cdr.markForCheck();
                return;
            }
        } catch {
            if (attempt >= POLL_DELAYS_MS.length - 1) {
                this.hasError = true;
                this.isLoading = false;
                this.cdr.markForCheck();
                return;
            }
        }

        // Null/404 means the webhook hasn't landed yet. Back off and retry.
        if (attempt >= POLL_DELAYS_MS.length - 1) {
            this.hasError = true;
            this.isLoading = false;
            this.cdr.markForCheck();
            return;
        }
        const delay = POLL_DELAYS_MS[attempt];
        setTimeout(() => this.hydrateFromServer(sessionId, attempt + 1), delay);
    }

    formatPrice(price: number): string {
        return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
    }

    lineTotalOf(item: { lineTotal: number }): string {
        return this.formatPrice(item.lineTotal);
    }

    formatPickupTime(isoString: string | null): string {
        if (!isoString) return '';
        try {
            return new Date(isoString).toLocaleTimeString('en-US', {
                timeZone: 'America/Detroit',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
        } catch {
            return isoString;
        }
    }

    formatEventDate(isoString: string | null): string {
        if (!isoString) return '';
        try {
            const d = new Date(isoString);
            if (isNaN(d.getTime())) return isoString;
            return d.toLocaleDateString('en-US', {
                timeZone: 'America/Detroit',
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return isoString;
        }
    }

    get pickupWindow(): string {
        if (!this.view) return '';
        const start = this.formatPickupTime(this.view.pickupStartAt);
        const end = this.formatPickupTime(this.view.pickupEndAt);
        if (start && end) return `${start} – ${end}`;
        return start || end;
    }
}
