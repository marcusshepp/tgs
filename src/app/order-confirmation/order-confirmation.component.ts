import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LineItem } from '../services/cart.service';
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
export class OrderConfirmationComponent implements OnInit {
    order: PendingOrder | null = null;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const raw = sessionStorage.getItem('tgs-pending-order');
            if (raw) {
                try {
                    this.order = JSON.parse(raw) as PendingOrder;
                } catch {
                    this.order = null;
                }
            }
        }
    }

    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    lineTotal(item: LineItem): string {
        return this.formatPrice(item.unitPrice * item.quantity);
    }
}
