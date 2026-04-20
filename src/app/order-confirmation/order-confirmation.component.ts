import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LineItem, CartService } from '../services/cart.service';
import { CmsService } from '../services/cms.service';
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

@Component({
    selector: 'app-order-confirmation',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './order-confirmation.component.html',
    styleUrl: './order-confirmation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
    order: PendingOrder | null = null;
    event: CmsEvent | null = null;
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

        // Stripe appends ?session_id=cs_... on successful checkout redirects.
        // The sessionStorage pending-order was written by the checkout component
        // right before the redirect; we use it to render line items while the
        // Stripe webhook asynchronously writes the authoritative order record.
        this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

        const raw = sessionStorage.getItem('tgs-pending-order');
        if (raw) {
            try {
                this.order = JSON.parse(raw) as PendingOrder;
            } catch {
                this.order = null;
            }
            this.cartService.clear();
            sessionStorage.removeItem('tgs-pending-order');
            this.cdr.markForCheck();

            if (this.order?.eventSlug) {
                this.cms.getEventBySlug(this.order.eventSlug).pipe(
                    takeUntil(this.destroy$),
                    catchError(() => of(null)),
                ).subscribe(event => {
                    this.event = event;
                    this.cdr.markForCheck();
                });
            }
            return;
        }

        // No pending order in sessionStorage. If we at least have a Stripe
        // session_id, show a generic confirmation instead of bouncing to home.
        if (!this.sessionId) {
            this.router.navigate(['/']);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formatPrice(price: number): string {
        return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
    }

    lineTotal(item: LineItem): string {
        return this.formatPrice(item.unitPrice * item.quantity);
    }

    formatPickupTime(isoString: string): string {
        if (!isoString) return '';
        try {
            return new Date(isoString).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
        } catch {
            return isoString;
        }
    }

    formatEventDate(isoString: string): string {
        if (!isoString) return '';
        try {
            const d = new Date(isoString);
            if (isNaN(d.getTime())) return isoString;
            return d.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return isoString;
        }
    }
}
