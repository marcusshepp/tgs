import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-stars',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="star-rating" [class.disabled]="disabled">
            <div class="stars-container">
                <button
                    *ngFor="let star of stars; let i = index"
                    (click)="onRatingChange(i + 1)"
                    (mouseenter)="!disabled && onHover(i + 1)"
                    (mouseleave)="!disabled && onHover(0)"
                    [class.filled]="star <= (hoverRating || rating)"
                    [class.disabled]="disabled"
                    class="star-btn"
                    type="button"
                    [attr.aria-label]="'Rate ' + (i + 1) + ' out of 5 stars'"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        [class.active]="star <= (hoverRating || rating)"
                    >
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        />
                    </svg>
                </button>
            </div>
            <p class="rating-text" *ngIf="showRating">{{ rating || hoverRating || 0 }}/5</p>
        </div>
    `,
    styles: [
        `
            .star-rating {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }

            .stars-container {
                display: flex;
                gap: 0.25rem;
            }

            .star-btn {
                background: none;
                border: none;
                padding: 0.25rem;
                cursor: pointer;
                transition: transform 0.2s ease;
                width: 2rem;
                height: 2rem;

                &:hover:not(.disabled) {
                    transform: scale(1.1);
                }

                &.disabled {
                    cursor: default;
                }

                svg {
                    width: 100%;
                    height: 100%;
                    fill: #e0e0e0;
                    transition: fill 0.2s ease;

                    &.active {
                        fill: #ffd700;
                    }
                }
            }

            .rating-text {
                font-size: 0.875rem;
                color: #666;
                margin: 0;
            }

            @media (max-width: 768px) {
                .star-btn {
                    width: 1.75rem;
                    height: 1.75rem;
                }
            }

            @media (max-width: 480px) {
                .star-btn {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        `,
    ],
})
export class StarComponent {
    @Input() rating = 0;
    @Input() disabled = false;
    @Input() showRating = true;
    @Output() ratingChange = new EventEmitter<number>();

    public stars = [1, 2, 3, 4, 5];
    public hoverRating = 0;

    public onRatingChange(rating: number): void {
        if (!this.disabled) {
            this.rating = rating;
            this.ratingChange.emit(rating);
        }
    }

    public onHover(rating: number): void {
        this.hoverRating = rating;
    }
}
