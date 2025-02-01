import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../data/menu.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Review {
    id: string;
    authorName: string;
    authorImage: string;
    rating: number;
    comment: string;
    date: Date;
}

@Component({
    selector: 'app-menu-item-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
    templateUrl: './menu-item-details.component.html',
    styleUrl: './menu-item-details.component.scss',
})
export class MenuItemDetailsComponent implements OnInit {
    public menu: MenuItem[] = MENU_ITEMS;
    public menuItemId!: string;
    public menuItem!: MenuItem | undefined;
    quantity: number = 1;
    reviews: Review[] = [];
    averageRating: number = 0;
    reviewForm!: FormGroup;
    isSubmitting: boolean = false;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.menuItemId = params['id'];

            this.menuItem = this.menu.find(
                (item: MenuItem): boolean => item.id === this.menuItemId
            );

            //this.loadMenuItem(this.menuItemId);
            //this.loadReviews(this.menuItemId);
        });
    }

    private loadMenuItem(id: string): void {
        // Implementation would typically call a service
        // For now, menuItem is assumed to be populated
    }

    private loadReviews(itemId: string): void {
        // Implementation would typically call a service
        // For now using mock data
        this.reviews = [
            {
                id: '1',
                authorName: 'Masirul Islam',
                authorImage: '/img/blog/comment-author1.png',
                rating: 5,
                comment: 'Great menu item! Would definitely order again.',
                date: new Date('2024-03-20T14:37:00'),
            },
            {
                id: '2',
                authorName: 'Daniel Adam',
                authorImage: '/img/blog/comment-author2.png',
                rating: 4,
                comment: 'Delicious food and great service!',
                date: new Date('2024-03-30T14:37:00'),
            },
        ];
        this.calculateAverageRating();
    }

    private calculateAverageRating(): void {
        if (this.reviews.length === 0) {
            this.averageRating = 0;
            return;
        }
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = parseFloat((sum / this.reviews.length).toFixed(2));
    }

    incrementQuantity(): void {
        if (this.quantity < 100) {
            this.quantity++;
        }
    }

    decrementQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart(): void {
        if (this.menuItem?.active) {
            // Implementation would call a cart service
            console.log(`Adding ${this.quantity} of ${this.menuItem?.title} to cart`);
        }
    }

    addToWishlist(): void {
        // Implementation would call a wishlist service
        console.log(`Adding ${this.menuItem?.title} to wishlist`);
    }

    setRating(rating: number): void {
        this.reviewForm.patchValue({ rating });
    }

    submitReview(): void {
        if (this.reviewForm.valid && !this.isSubmitting) {
            this.isSubmitting = true;

            // Implementation would typically call a service
            const newReview: Review = {
                id: Date.now().toString(),
                authorName: this.reviewForm.get('name')?.value,
                authorImage: '/img/blog/default-avatar.png', // Default avatar
                rating: this.reviewForm.get('rating')?.value,
                comment: this.reviewForm.get('comment')?.value,
                date: new Date(),
            };

            // Simulate API call
            setTimeout(() => {
                this.reviews.unshift(newReview);
                this.calculateAverageRating();
                this.reviewForm.reset();
                this.isSubmitting = false;
            }, 1000);
        }
    }
}
