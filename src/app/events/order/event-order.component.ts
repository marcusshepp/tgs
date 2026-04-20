import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CmsService } from '../../services/cms.service';
import { CartService, LineItem } from '../../services/cart.service';
import { CmsEvent, CmsMenuItem } from '../../models/cms.types';

type OrderWindowState = 'open' | 'closed' | 'notOpen';

@Component({
    selector: 'app-event-order',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './event-order.component.html',
    styleUrl: './event-order.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventOrderComponent implements OnInit, OnDestroy {
    event: CmsEvent | null = null;
    menuItems: CmsMenuItem[] = [];
    isLoading = true;
    eventNotFound = false;
    isSubmitting = false;

    cartItems: LineItem[] = [];
    totalQty = 0;
    totalPrice = 0;

    private destroy$ = new Subject<void>();
    private now = new Date();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cms: CmsService,
        public cartService: CartService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

    ngOnInit(): void {
        this.now = new Date();

        this.route.paramMap.pipe(
            takeUntil(this.destroy$),
            switchMap(params => {
                const slug = params.get('slug') ?? '';
                return this.cms.getEventBySlug(slug).pipe(
                    catchError(() => of(null))
                );
            })
        ).subscribe(event => {
            if (!event) {
                this.eventNotFound = true;
                this.isLoading = false;
                this.cdr.markForCheck();
                return;
            }
            this.event = event;
            this.loadMenuItems(event.linkedMenuItemSlugs);
        });

        this.cartService.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.cartItems = items;
            this.cdr.markForCheck();
        });

        this.cartService.totalQty$.pipe(takeUntil(this.destroy$)).subscribe(qty => {
            this.totalQty = qty;
            this.cdr.markForCheck();
        });

        this.cartService.totalPrice$.pipe(takeUntil(this.destroy$)).subscribe(price => {
            this.totalPrice = price;
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadMenuItems(slugs: string[]): void {
        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menuItems = slugs.length
                ? items.filter(i => slugs.includes(i.slug))
                : items;
            this.isLoading = false;
            this.cdr.markForCheck();
        });
    }

    get orderWindowState(): OrderWindowState {
        if (!this.event) return 'open';
        const { orderOpensAt, orderClosesAt } = this.event;
        if (!orderOpensAt || !orderClosesAt) return 'open';
        const opens = new Date(orderOpensAt);
        const closes = new Date(orderClosesAt);
        if (this.now > closes) return 'closed';
        if (this.now < opens) return 'notOpen';
        return 'open';
    }

    get isOrderingDisabled(): boolean {
        return this.orderWindowState !== 'open';
    }

    get showOrderClosedBanner(): boolean {
        return this.orderWindowState === 'closed';
    }

    get showOrderNotOpenBanner(): boolean {
        return this.orderWindowState === 'notOpen';
    }

    get noLinkedItems(): boolean {
        return !this.isLoading && this.event !== null && this.menuItems.length === 0;
    }

    getItemQty(slug: string): number {
        return this.cartItems.find(i => i.slug === slug)?.quantity ?? 0;
    }

    addItem(item: CmsMenuItem): void {
        if (!this.event || this.isOrderingDisabled) return;
        this.cartService.addItem(item, this.event.slug);
    }

    decrementItem(item: CmsMenuItem): void {
        const qty = this.getItemQty(item.slug);
        if (qty <= 1) {
            this.cartService.removeItem(item.slug);
        } else {
            this.cartService.updateQty(item.slug, qty - 1);
        }
    }

    incrementItem(item: CmsMenuItem): void {
        if (!this.event || this.isOrderingDisabled) return;
        this.cartService.addItem(item, this.event.slug);
    }

    formatTime(isoDate: string): string {
        if (!isoDate) return '';
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return isoDate;
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    formatDate(isoDate: string): string {
        if (!isoDate) return '';
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return isoDate;
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    formatPrice(price: number): string {
        const str = price.toString();
        if (str.includes('.') && !str.endsWith('.0')) {
            return `$${price.toFixed(2)}`;
        }
        return `$${Math.round(price)}`;
    }

    get pickupTimeWindow(): string {
        if (!this.event) return '';
        const start = this.formatTime(this.event.pickupStartAt);
        const end = this.formatTime(this.event.pickupEndAt);
        if (start && end) return `${start} – ${end}`;
        return start || end;
    }

    get countdownLabel(): string | null {
        if (!this.event?.orderClosesAt) return null;
        const closes = new Date(this.event.orderClosesAt);
        const diffMs = closes.getTime() - this.now.getTime();
        if (diffMs <= 0 || diffMs > 24 * 60 * 60 * 1000) return null;
        const hours = Math.floor(diffMs / (60 * 60 * 1000));
        const mins = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));
        return `Closes in ${hours}h ${mins}m`;
    }

    get cartSummaryText(): string {
        if (this.totalQty === 0) return '';
        const names = this.cartItems.slice(0, 2).map(i => i.name).join(', ');
        const extra = this.totalQty - this.cartItems.slice(0, 2).reduce((s, i) => s + i.quantity, 0);
        return extra > 0 ? `${names} +${extra} more` : names;
    }

    get formattedTotal(): string {
        return this.totalPrice % 1 === 0 ? `$${this.totalPrice}` : `$${this.totalPrice.toFixed(2)}`;
    }

    submitOrder(): void {
        if (this.totalQty === 0 || this.isSubmitting || this.isOrderingDisabled) return;
        this.isSubmitting = true;
        this.router.navigate(['/checkout']);
    }

    formatConfirmedItemPrice(item: LineItem): string {
        const total = item.unitPrice * item.quantity;
        const str = total.toString();
        if (str.includes('.') && !str.endsWith('.0')) {
            return `$${total.toFixed(2)}`;
        }
        return `$${Math.round(total)}`;
    }
}
