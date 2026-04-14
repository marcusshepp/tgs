import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { CmsService } from '../services/cms.service';
import { CmsReview } from '../models/cms.types';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, BannerComponent, PageTitleComponent],
    templateUrl: './reviews.component.html',
    styleUrls: [`./reviews.component.scss`],
})
export class ReviewsComponent implements OnInit {
    reviews: CmsReview[] = [];
    loading = true;
    error = false;

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getReviews().subscribe({
            next: (data) => {
                this.reviews = data;
                this.loading = false;
            },
            error: () => {
                this.error = true;
                this.loading = false;
            },
        });
    }

    getStarArray(rating: number): number[] {
        const rounded = Math.max(0, Math.min(5, Math.round(rating)));
        return Array(rounded).fill(0);
    }

    getRelativeTime(dateStr: string): string {
        const timestamp = parseInt(dateStr, 10);
        const now = Date.now() / 1000;
        const elapsed = now - timestamp;

        const secondsPerMinute = 60;
        const secondsPerHour = 3600;
        const secondsPerDay = 86400;
        const secondsPerWeek = secondsPerDay * 7;
        const secondsPerMonth = secondsPerDay * 30.44;
        const secondsPerYear = secondsPerDay * 365.25;

        if (elapsed < secondsPerMinute) {
            return 'Just now';
        } else if (elapsed < secondsPerHour) {
            const minutes = Math.floor(elapsed / secondsPerMinute);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (elapsed < secondsPerDay) {
            const hours = Math.floor(elapsed / secondsPerHour);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (elapsed < secondsPerWeek) {
            const days = Math.floor(elapsed / secondsPerDay);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (elapsed < secondsPerMonth) {
            const weeks = Math.floor(elapsed / secondsPerWeek);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (elapsed < secondsPerYear) {
            const months = Math.floor(elapsed / secondsPerMonth);
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(elapsed / secondsPerYear);
            return `${years} year${years > 1 ? 's' : ''} ago`;
        }
    }
}
