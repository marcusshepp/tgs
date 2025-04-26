import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
// Remove the service import: import { GoogleReview, GoogleReviewsService } from '../services/places.service';
import { PageTitleComponent } from '../page-title/page-title.component';

// Define the interface directly here or ensure it's imported correctly
export interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string; // Keep for structure, but we'll calculate dynamically
    text: string;
    time: number; // Unix timestamp (seconds)
}

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, BannerComponent, PageTitleComponent],
    templateUrl: './reviews.component.html',
    styleUrls: [`./reviews.component.scss`],
})
export class ReviewsComponent implements OnInit {
    reviews: GoogleReview[] = [];
    loading = false; // Data is available immediately
    error = false; // Assume no error with static data

    private staticReviewsData: GoogleReview[] = [
        {
            author_name: 'Rebecca Padin',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Rebecca+Padin&background=random',
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: "Tim's Gourmet Sliders boasts a fantastic variety of sliders with fries, serving up something for everyone! Quick turnaround makes it easy to please a crowd, and prices are very reasonable. Punctual, friendly, and great for a block party!",
            time: 1730152800, // Approx Nov 25, 2024 (5 months ago from Apr 25, 2025)
        },
        {
            author_name: 'Lisa Golden',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Lisa+Golden&background=random',
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: "Tim's Sliders were amazing! The best black and blue burger I've ever had...I could have eaten 10 more! Can't want to have them again at a company event. I HIGHLY recommend 100%. Fresh and super high quality ingredients. I need to reverse engineer the sauce that was on my burger. I'll be dreaming about it for months!",
            time: 1732744800, // Approx Dec 25, 2024 (4 months ago)
        },
        {
            author_name: 'Shawn Disbrow',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Shawn+Disbrow&background=random',
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: "Wow! Just Wow!! Decided to have a company tailgate lunch, best choice we made was choosing Tim's! The food was absolutely fantastic as well as the service! Rave reviews from all of the employees! Best sliders I've had, ever! Will definitely be calling upon you again! Thank you!",
            time: 1732744800, // Approx Dec 25, 2024 (4 months ago)
        },
        {
            author_name: 'Lin Beckhold',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Lin+Beckhold&background=random',
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: 'They were at our local library today and the food was great! I got the steakhouse sliders, hubby got the bacon cheeseburger, and they were bigger and better then we expected. Their fries were great as well. We will be watching for them in our travels.',
            time: 1730152800, // Approx Nov 25, 2024 (5 months ago)
        },
        {
            author_name: 'Christie R',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Christie+R&background=random',
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: 'Had a great experience using them for our daughters grad party. Guests were impressed with the food and how quick it came out. Guests even got beepers for when their food was ready. We had 150+ people and all I heard was how great it was',
            time: 1722463200, // Approx Aug 25, 2024 (8 months ago)
        },
        {
            author_name: 'Kimberly Schermesser',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Kimberly+Schermesser&background=random', // Generate avatar
            rating: 5,
            relative_time_description: '', // Will be calculated
            text: 'Great communication, easy to work with and excellent food! Everyone at our event was impressed with how great everything was. I will use Tim’s again for all my events. Well done!',
            time: 1745445600, // Approx Apr 23, 2025 (2 days ago)
        },
    ];

    constructor() {}

    ngOnInit(): void {
        this.reviews = this.staticReviewsData;
    }


    getStarArray(rating: number): number[] {
        // Ensure rating is an integer between 0 and 5
        const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
        return Array(roundedRating).fill(0);
    }

    getRelativeTime(timestamp: number): string {
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
