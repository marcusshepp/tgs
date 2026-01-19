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
            author_name: 'RD D',
            profile_photo_url: 'https://ui-avatars.com/api/?name=RD+D&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim and his crew came out to our dealerships and feed everyone. These Burgers are Excellent. The Steak slider and the impossible Burger are really Tasty and the Fries good too. Tim come back next year please.",
            time: 1766102400, // Dec 2025 (1 month ago)
        },
        {
            author_name: 'James Hargrove',
            profile_photo_url: 'https://ui-avatars.com/api/?name=James+Hargrove&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Best sliders i ever had. Highly recommend, one of the best food trucks in the metro area along with genuine customer service and ownership 10/10",
            time: 1758240000, // Sep 2025 (4 months ago)
        },
        {
            author_name: 'Sandra Anger',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Sandra+Anger&background=random',
            rating: 5,
            relative_time_description: '',
            text: "EXCELLENT food and service! Made our graduation party extra special. The sliders and fries got RAVE reviews from everyone. Very friendly, organized, and professional. Highly recommend.",
            time: 1755561600, // Aug 2025 (5 months ago)
        },
        {
            author_name: 'Anita Rodgers',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Anita+Rodgers&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim's Food truck is the best food truck ever! If you want delicious food with a variety of choices this is your company. The customer service is exceptional and to me beyond 5 stars. My annual picnic for my group of stroke survivors will definitely be memorable and Tim's Food Truck helped to make this happen. Thank you again.",
            time: 1752969600, // Jul 2025 (6 months ago)
        },
        {
            author_name: 'Marlo Rencher',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Marlo+Rencher&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim's Gourmet Sliders truly elevated my event! The food was amazing and the friendly staff was extremely professional throughout the process. The game changer is the pager system for guests so that they can enjoy the event after they order and pick up hot, delicious sliders once they're ready. Absolutely recommend!",
            time: 1752969600, // Jul 2025 (6 months ago)
        },
        {
            author_name: 'Jim McBroom',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Jim+McBroom&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim's Gourmet Sliders were in our neighborhood tonight serving up the goods! We got the Steak Burger Sliders & the Garlic Chicken Sliders served up with delicious french fries! I highly recommend!",
            time: 1750291200, // Jun 2025 (7 months ago)
        },
        {
            author_name: 'Rebecca Padin',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Rebecca+Padin&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim's Gourmet Sliders boasts a fantastic variety of sliders with fries, serving up something for everyone! Quick turnaround makes it easy to please a crowd, and prices are very reasonable. Punctual, friendly, and great for a block party!",
            time: 1730152800, // Nov 2024
        },
        {
            author_name: 'Lisa Golden',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Lisa+Golden&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Tim's Sliders were amazing! The best black and blue burger I've ever had...I could have eaten 10 more! Can't want to have them again at a company event. I HIGHLY recommend 100%. Fresh and super high quality ingredients. I need to reverse engineer the sauce that was on my burger. I'll be dreaming about it for months!",
            time: 1732744800, // Dec 2024
        },
        {
            author_name: 'Shawn Disbrow',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Shawn+Disbrow&background=random',
            rating: 5,
            relative_time_description: '',
            text: "Wow! Just Wow!! Decided to have a company tailgate lunch, best choice we made was choosing Tim's! The food was absolutely fantastic as well as the service! Rave reviews from all of the employees! Best sliders I've had, ever! Will definitely be calling upon you again! Thank you!",
            time: 1732744800, // Dec 2024
        },
        {
            author_name: 'Lin Beckhold',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Lin+Beckhold&background=random',
            rating: 5,
            relative_time_description: '',
            text: 'They were at our local library today and the food was great! I got the steakhouse sliders, hubby got the bacon cheeseburger, and they were bigger and better then we expected. Their fries were great as well. We will be watching for them in our travels.',
            time: 1730152800, // Nov 2024
        },
        {
            author_name: 'Christie R',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Christie+R&background=random',
            rating: 5,
            relative_time_description: '',
            text: 'Had a great experience using them for our daughters grad party. Guests were impressed with the food and how quick it came out. Guests even got beepers for when their food was ready. We had 150+ people and all I heard was how great it was',
            time: 1722463200, // Aug 2024
        },
        {
            author_name: 'Kimberly Schermesser',
            profile_photo_url: 'https://ui-avatars.com/api/?name=Kimberly+Schermesser&background=random',
            rating: 5,
            relative_time_description: '',
            text: 'Great communication, easy to work with and excellent food! Everyone at our event was impressed with how great everything was. I will use Tim's again for all my events. Well done!',
            time: 1745445600, // Apr 2025
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
