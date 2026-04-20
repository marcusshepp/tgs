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

    private async safeReadError(res: Response): Promise<string> {
        try {
            const data = await res.json();
            return data?.error || JSON.stringify(data);
        } catch {
            return res.statusText;
        }
    }
}
