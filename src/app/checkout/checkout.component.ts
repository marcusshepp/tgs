import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, LineItem } from '../services/cart.service';
import { StoreService } from '../services/store.service';

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
    checkoutError: string | null = null;

    private destroy$ = new Subject<void>();

    constructor(
        public cartService: CartService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private storeService: StoreService,
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

    async onSubmit(form: NgForm): Promise<void> {
        this.submitAttempted = true;
        this.checkoutError = null;

        if (form.invalid || this.totalQty === 0 || this.isSubmitting) {
            return;
        }
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.isSubmitting = true;
        this.cdr.markForCheck();

        try {
            // 1. Resolve slugs → Stripe priceIds. Filter out anything inactive.
            const slugs = this.items.map(i => i.slug);
            const resolved = await this.storeService.resolveSlugs(slugs);
            const priceBySlug = new Map(
                resolved.items
                    .filter(r => r.active && !r.archived)
                    .map(r => [r.slug, r.priceId] as const),
            );

            const unavailable = this.items.filter(i => !priceBySlug.has(i.slug));
            if (unavailable.length > 0) {
                for (const item of unavailable) {
                    this.cartService.removeItem(item.slug);
                }
                this.checkoutError =
                    `Some items are no longer available and were removed: ${unavailable.map(i => i.name).join(', ')}. Please review your cart.`;
                this.isSubmitting = false;
                this.cdr.markForCheck();
                return;
            }

            // 2. Persist a client-side copy of the pending order so the
            //    confirmation page can render line items while the webhook
            //    catches up and writes the authoritative order record.
            const eventSlug = this.cartService.getEventSlug();
            const pendingOrder = {
                orderId: 'pending',
                items: [...this.items],
                total: this.orderTotal,
                customer: { ...this.customer },
                eventSlug,
                placedAt: new Date().toISOString(),
            };
            sessionStorage.setItem('tgs-pending-order', JSON.stringify(pendingOrder));

            // 3. Create a Stripe Checkout Session and redirect.
            const origin = window.location.origin;
            const metadata: Record<string, string> = {
                customerName: this.customer.name,
                customerPhone: this.customer.phone,
            };
            if (this.customer.pickupInstructions) {
                metadata['pickupInstructions'] = this.customer.pickupInstructions;
            }
            if (eventSlug) {
                metadata['eventSlug'] = eventSlug;
            }

            const session = await this.storeService.createCheckoutSession({
                items: this.items.map(i => ({
                    priceId: priceBySlug.get(i.slug)!,
                    quantity: i.quantity,
                })),
                successUrl: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
                cancelUrl: `${origin}/checkout`,
                customerEmail: this.customer.email,
                metadata,
            });

            window.location.href = session.url;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Checkout failed';
            this.checkoutError = `We couldn't start checkout — ${message}. Please try again or contact us.`;
            this.isSubmitting = false;
            this.cdr.markForCheck();
        }
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
