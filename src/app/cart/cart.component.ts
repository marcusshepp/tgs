import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, LineItem } from '../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
    items: LineItem[] = [];
    totalQty = 0;
    totalPrice = 0;

    private destroy$ = new Subject<void>();

    constructor(
        public cartService: CartService,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {}

    ngOnInit(): void {
        this.cartService.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.items = items;
        });
        this.cartService.totalQty$.pipe(takeUntil(this.destroy$)).subscribe(qty => {
            this.totalQty = qty;
        });
        this.cartService.totalPrice$.pipe(takeUntil(this.destroy$)).subscribe(price => {
            this.totalPrice = price;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get subtotal(): number {
        return this.totalPrice;
    }

    get tax(): number {
        return 0;
    }

    get orderTotal(): number {
        return this.subtotal + this.tax;
    }

    get isEmpty(): boolean {
        return this.totalQty === 0;
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
