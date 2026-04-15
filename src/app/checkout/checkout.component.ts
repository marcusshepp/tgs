import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, LineItem } from '../services/cart.service';

export interface CustomerInfo {
    name: string;
    phone: string;
    email: string;
    pickupInstructions: string;
}

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {
    items: LineItem[] = [];
    totalQty = 0;
    totalPrice = 0;

    customer: CustomerInfo = {
        name: '',
        phone: '',
        email: '',
        pickupInstructions: '',
    };

    isSubmitting = false;
    submitAttempted = false;

    private destroy$ = new Subject<void>();

    constructor(
        public cartService: CartService,
        private router: Router,
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

    formatPrice(price: number): string {
        return `$${price.toFixed(2)}`;
    }

    lineTotal(item: LineItem): string {
        return this.formatPrice(item.unitPrice * item.quantity);
    }

    onSubmit(form: NgForm): void {
        this.submitAttempted = true;

        if (form.invalid || this.totalQty === 0 || this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;

        setTimeout(() => {
            if (isPlatformBrowser(this.platformId)) {
                const orderId = `#TGS-${Math.floor(1000 + Math.random() * 9000)}`;
                const pendingOrder = {
                    orderId,
                    items: [...this.items],
                    total: this.orderTotal,
                    customer: { ...this.customer },
                    eventSlug: this.cartService.getEventSlug(),
                    placedAt: new Date().toISOString(),
                };
                sessionStorage.setItem('tgs-pending-order', JSON.stringify(pendingOrder));
            }
            this.cartService.clear();
            this.isSubmitting = false;
            this.cdr.markForCheck();
            this.router.navigate(['/order-confirmation']);
        }, 1500);
    }

    isFieldInvalid(form: NgForm, fieldName: string): boolean {
        const field = form.controls[fieldName];
        if (!field) return false;
        return (field.invalid && (field.dirty || field.touched || this.submitAttempted));
    }

    getFieldError(form: NgForm, fieldName: string): string {
        const field = form.controls[fieldName];
        if (!field || !field.errors) return '';
        if (field.errors['required']) {
            switch (fieldName) {
                case 'name': return 'Name is required.';
                case 'phone': return 'Phone number is required.';
                case 'email': return 'Email address is required.';
                default: return 'This field is required.';
            }
        }
        if (field.errors['email']) return 'Please enter a valid email address.';
        if (field.errors['pattern']) return 'Please enter a valid phone number.';
        return 'Please check this field.';
    }
}
