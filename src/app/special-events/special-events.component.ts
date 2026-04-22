import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsEvent, CmsEventHighlight } from '../models/cms.types';

@Component({
    selector: 'app-special-events',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './special-events.component.html',
    styleUrl: './special-events.component.scss',
})
export class SpecialEventsComponent implements OnInit, OnDestroy {
    isBrowser: boolean;
    featuredEvent: CmsEvent | null = null;
    otherUpcoming: CmsEvent[] = [];
    pastEvents: CmsEvent[] = [];
    now: Date = new Date();
    private destroy$ = new Subject<void>();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private cms: CmsService,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        this.now = new Date();

        this.cms.getEvents().pipe(takeUntil(this.destroy$)).subscribe(events => {
            const upcoming = events
                .filter(e => e.status === 'upcoming')
                .sort((a, b) => this.parseEventDate(a.date).getTime() - this.parseEventDate(b.date).getTime());
            this.featuredEvent = upcoming[0] || null;
            this.otherUpcoming = upcoming.slice(1);
            this.pastEvents = events
                .filter(e => e.status === 'past')
                .sort((a, b) => this.parseEventDate(b.date).getTime() - this.parseEventDate(a.date).getTime())
                .slice(0, 6);
        });

        // Keep order window state + countdown chip accurate without re-fetching.
        if (this.isBrowser) {
            interval(30_000).pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.now = new Date();
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private parseEventDate(dateStr: string): Date {
        if (!dateStr) return new Date(0);
        const cleaned = dateStr
            .replace(/^[A-Za-z]+,\s*/, '')
            .replace(/(\d+)(st|nd|rd|th)/g, '$1');
        const parsed = new Date(cleaned);
        return isNaN(parsed.getTime()) ? new Date(0) : parsed;
    }

    isOrderingOpen(event: CmsEvent): boolean {
        if (!event.orderOpensAt || !event.orderClosesAt) return false;
        const opens = new Date(event.orderOpensAt);
        const closes = new Date(event.orderClosesAt);
        return this.now >= opens && this.now <= closes;
    }

    isOrderingFuture(event: CmsEvent): boolean {
        if (!event.orderOpensAt) return false;
        const opens = new Date(event.orderOpensAt);
        return this.now < opens;
    }

    formatOrderOpensDate(isoDate: string): string {
        if (!isoDate) return '';
        const d = new Date(isoDate);
        if (isNaN(d.getTime())) return isoDate;
        return d.toLocaleDateString('en-US', {
            timeZone: 'America/Detroit',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    formatPickupWindow(event: CmsEvent): string {
        if (!event.pickupStartAt || !event.pickupEndAt) {
            return this.getEventTime(event);
        }
        const start = this.formatPickupTime(event.pickupStartAt);
        const end = this.formatPickupTime(event.pickupEndAt);
        if (start && end) return `${start} – ${end}`;
        return start || end;
    }

    private formatPickupTime(iso: string): string {
        if (!iso) return '';
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleTimeString('en-US', {
            timeZone: 'America/Detroit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    getEventTime(event: CmsEvent): string {
        if (event.endTime) {
            return `${event.startTime} – ${event.endTime}`;
        }
        return event.startTime;
    }

    highlightText(h: CmsEventHighlight): string {
        if (typeof h === 'string') return h;
        if (h && typeof h === 'object' && typeof h.value === 'string') return h.value;
        return '';
    }

    countdownLabel(event: CmsEvent): string | null {
        if (!event.orderClosesAt) return null;
        const closes = new Date(event.orderClosesAt);
        const diffMs = closes.getTime() - this.now.getTime();
        if (diffMs <= 0 || diffMs > 24 * 60 * 60 * 1000) return null;
        const hours = Math.floor(diffMs / (60 * 60 * 1000));
        const mins = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));
        return `Ordering closes in ${hours}h ${mins}m`;
    }
}
