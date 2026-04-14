import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
        confirmationHeading: 'Order confirmed — this is a demo',
        confirmationMessage: '',
    };

    private destroy$ = new Subject<void>();

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private router: Router,
        private cartService: CartService,
        private cms: CmsService,
    ) {}

    ngOnInit(): void {
        this.cms.getOrderUi().pipe(takeUntil(this.destroy$)).subscribe(ui => {
            this.orderUi = ui;
        });

        if (isPlatformBrowser(this.platformId)) {
            const raw = sessionStorage.getItem('tgs-pending-order');
            if (!raw) {
                this.router.navigate(['/']);
                return;
            }
            let parsed: PendingOrder | null = null;
            try {
                parsed = JSON.parse(raw) as PendingOrder;
            } catch {
                this.router.navigate(['/']);
                return;
            }
            this.order = parsed;
            this.cartService.clear();
            sessionStorage.removeItem('tgs-pending-order');

            if (this.order.eventSlug) {
                this.cms.getEventBySlug(this.order.eventSlug).pipe(
                    takeUntil(this.destroy$),
                    catchError(() => of(null)),
                ).subscribe(event => {
                    this.event = event;
                });
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
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
            return new Date(isoString).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return isoString;
        }
    }
}
