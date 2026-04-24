import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, LineItem, PricingBreakdown, PricingBreakdownLine } from '../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, OnDestroy {
    items: LineItem[] = [];
    totalQty = 0;
    totalPrice = 0;
    breakdown: PricingBreakdown = {
        subtotalCents: 0,
        feeCents: 0,
        taxCents: 0,
        totalCents: 0,
        lines: [],
    };

    private destroy$ = new Subject<void>();

    constructor(
        public cartService: CartService,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {}

    ngOnInit(): void {
        this.cartService.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.items = items;
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
        this.cartService.breakdown$.pipe(takeUntil(this.destroy$)).subscribe(b => {
            this.breakdown = b;
            this.cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get subtotal(): number {
        return this.breakdown.subtotalCents / 100;
    }

    get orderTotal(): number {
        return this.breakdown.totalCents / 100;
    }

    get isEmpty(): boolean {
        return this.totalQty === 0;
    }

    formatCents(cents: number): string {
        return this.formatPrice(cents / 100);
    }

    trackLine(_index: number, line: PricingBreakdownLine): string {
        return line.type;
    }

    increment(item: LineItem): void {
        this.cartService.updateQty(item.slug, item.quantity + 1);
    }

    decrement(item: LineItem): void {
        if (item.quantity <= 1) {
            this.cartService.removeItem(item.slug);
        } else {
            this.cartService.updateQty(item.slug, item.quantity - 1);
        }
    }

    remove(item: LineItem): void {
        this.cartService.removeItem(item.slug);
    }

    formatPrice(price: number): string {
        return price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
    }

    lineTotal(item: LineItem): string {
        return this.formatPrice(item.unitPrice * item.quantity);
    }
}
