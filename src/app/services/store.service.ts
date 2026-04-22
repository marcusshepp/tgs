import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ResolvedSlug {
    slug: string;
    priceId: string;
    productId: string;
    priceCents: number;
    currency: string;
    active: boolean;
    archived: string | null;
    stripeMode: string;
}

export interface ResolveSlugsResponse {
    items: ResolvedSlug[];
    missing: string[];
}

export interface CheckoutItem {
    priceId: string;
    quantity: number;
}

export interface CheckoutRequest {
    items: CheckoutItem[];
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
}

export interface CheckoutResponse {
    url: string;
    sessionId: string;
}

export interface OrderBySessionItem {
    slug: string | null;
    name: string | null;
    quantity: number;
    lineTotalCents: number;
}

export interface OrderBySessionResponse {
    order: {
        orderId: string;
        status: string;
        items: OrderBySessionItem[];
        subtotal: number | null;
        total: number;
        currency: string;
        eventSlug: string | null;
        eventName: string | null;
        eventDate: string | null;
        pickupLocation: string | null;
        pickupStartAt: string | null;
        pickupEndAt: string | null;
        pickupInstructions: string | null;
    };
}

@Injectable({ providedIn: 'root' })
export class StoreService {
    private readonly base = environment.storeApiBase;
    private readonly domain = environment.storeDomain;

    async resolveSlugs(slugs: string[]): Promise<ResolveSlugsResponse> {
        if (slugs.length === 0) {
            return { items: [], missing: [] };
        }
        const params = new URLSearchParams({
            domain: this.domain,
            slugs: slugs.join(','),
        });
        const res = await fetch(`${this.base}/resolve-slugs?${params.toString()}`);
        if (!res.ok) {
            const detail = await this.safeReadError(res);
            throw new Error(`resolve-slugs failed: ${res.status} ${detail}`);
        }
        return res.json();
    }

    async createCheckoutSession(body: CheckoutRequest): Promise<CheckoutResponse> {
        const res = await fetch(`${this.base}/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain: this.domain, ...body }),
        });
        if (!res.ok) {
            const detail = await this.safeReadError(res);
            throw new Error(`checkout failed: ${res.status} ${detail}`);
        }
        return res.json();
    }

    // Returns null when the order hasn't been written yet (webhook lag, 404 with
    // pending=true). Throws only on unexpected failures so callers can retry
    // distinctly from surfacing an error.
    async getOrderBySession(sessionId: string): Promise<OrderBySessionResponse | null> {
        const params = new URLSearchParams({
            domain: this.domain,
            sessionId,
        });
        const res = await fetch(`${this.base}/orders/by-session?${params.toString()}`);
        if (res.status === 404) return null;
        if (!res.ok) {
            const detail = await this.safeReadError(res);
            throw new Error(`order lookup failed: ${res.status} ${detail}`);
        }
        return res.json();
    }

    private async safeReadError(res: Response): Promise<string> {
        try {
            const data = await res.json();
            return data?.error || JSON.stringify(data);
        } catch {
            return res.statusText;
        }
    }
}
