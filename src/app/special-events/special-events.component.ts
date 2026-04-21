import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
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
    upcomingEvents: CmsEvent[] = [];
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
            this.upcomingEvents = events
                .filter(e => e.status === 'upcoming')
                .sort((a, b) => this.parseEventDate(a.date).getTime() - this.parseEventDate(b.date).getTime());
            this.pastEvents = events
                .filter(e => e.status === 'past')
                .sort((a, b) => this.parseEventDate(b.date).getTime() - this.parseEventDate(a.date).getTime());
        });
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
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
}
