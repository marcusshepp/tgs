import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { GoogleReview, GoogleReviewsService } from '../services/places.service';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, BannerComponent, PageTitleComponent],
    templateUrl: './reviews.component.html',
    styleUrls: [`./reviews.component.scss`],
})
export class ReviewsComponent implements OnInit {
    reviews: GoogleReview[] = [];
    loading = true;
    error = false;

    constructor(private googleReviewsService: GoogleReviewsService) {}

    ngOnInit(): void {
        this.loadReviews();
    }

    loadReviews(): void {
        this.googleReviewsService.getReviews().subscribe({
            next: (data) => {
                this.reviews = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching reviews:', err);
                this.error = true;
                this.loading = false;
            },
        });
    }

    getStarArray(rating: number): number[] {
        return Array(Math.round(rating)).fill(0);
    }
}
