Project Path: menu-item-details

Source Tree:

```
menu-item-details
├── menu-item-details.component.ts
├── testimonials
│   ├── testimonials.component.html
│   ├── testimonials.component.scss
│   └── testimonials.component.ts
├── menu-item-details.component.html
└── menu-item-details.component.scss

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/menu-item-details.component.ts`:

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../data/menu.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';

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
    public isMobile$: Observable<boolean>;
    quantity: number = 1;
    reviews: Review[] = [];
    averageRating: number = 0;
    reviewForm!: FormGroup;
    isSubmitting: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private mobileService: MobileService
    ) {
        this.isMobile$ = this.mobileService.showMobileMenu$();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.menuItemId = params['id'];

            this.menuItem = this.menu.find(
                (item: MenuItem): boolean => item.id === this.menuItemId
            );
        });
    }

    private calculateAverageRating(): void {
        if (this.reviews.length === 0) {
            this.averageRating = 0;
            return;
        }
        const sum = this.reviews.reduce(
            (acc, review) => acc + review.rating,
            0
        );
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
            console.log(
                `Adding ${this.quantity} of ${this.menuItem?.title} to cart`
            );
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

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/testimonials/testimonials.component.html`:

```html
<div class="testimonial-section section-padding pb-0 fix">
    <div class="testi-shape">
        <img src="/img/testimonial/testi-shape.png" alt="img" />
    </div>
    <div class="testimonial-wrapper style3">
        <div class="container">
            <div class="title-area">
                <div class="sub-title text-center">
                    <img class="me-1" src="/img/icon/titleIcon.svg" alt="icon" />
                    Testimonials
                    <img class="ms-1" src="/img/icon/titleIcon.svg" alt="icon" />
                </div>
                <h2 class="title">What Clients Say About The: {{ menuItem?.title }}</h2>
            </div>

            <div class="slider-area">
                <div class="testimonial-slider">
                    <div class="testimonial-wrapper">
                        <div
                            class="testimonial-card style3"
                            *ngFor="let testimonial of testimonials; let i = index"
                            [style.display]="i === currentIndex ? 'block' : 'none'"
                        >
                            <div class="testimonial-body">
                                <div class="icon">
                                    <img src="/img/icon/star2.svg" alt="icon" />
                                </div>

                                <p>{{ testimonial.content }}</p>

                                <div class="fancy-box">
                                    <div class="item2">
                                        <h6>{{ testimonial.name }}</h6>
                                    </div>
                                    <div class="quote">
                                        <img src="/img/icon/quote.svg" alt="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btn-wrap">
                <div class="arrow-prev" (click)="previousSlide()">
                    <i class="fa-regular fa-arrow-left"></i>
                </div>
                <div class="arrow-next" (click)="nextSlide()">
                    <i class="fa-regular fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
</div>

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/testimonials/testimonials.component.scss`:

```scss
.testimonial-section {
    position: relative;
    margin-bottom: 120px;
}

.testimonial-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}

.testimonial-wrapper > .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.title-area {
    text-align: center;
    margin-bottom: 50px;

    .sub-title {
        font-size: 18px;
        color: #666;
        margin-bottom: 15px;

        img {
            height: 20px;
            vertical-align: middle;
        }
    }

    .title {
        font-size: 36px;
        font-weight: bold;
        color: #333;
    }
}

.testimonial-card {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    margin: 20px;

    .testimonial-body {
        text-align: center;

        .icon {
            margin-bottom: 20px;
            img {
                height: 30px;
            }
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin-bottom: 25px;
        }
    }
}

.fancy-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid #eee;

    .item2 {
        h6 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        p {
            font-size: 14px;
            color: #666;
            margin: 0;
        }
    }

    .quote {
        img {
            height: 25px;
        }
    }
}

.btn-wrap {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
    top: 250px;
    position: absolute;
    height: 110px;

    .arrow-prev,
    .arrow-next {
        cursor: pointer;
        padding: 10px;
        border-radius: 50%;
        background: #f5f5f5;
        transition: all 0.3s ease;

        &:hover {
            background: #e0e0e0;
        }

        i {
            font-size: 20px;
        }
    }
}

@media (max-width: 768px) {
}

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/testimonials/testimonials.component.ts`:

```ts
import { Component, Input } from '@angular/core';
import { MenuItem } from '../../data/menu.model';
import { Testimonial, TESTIMONIALS } from '../../data/testimonials.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    @Input() menuItem?: MenuItem;
    testimonials: Testimonial[] = TESTIMONIALS;
    currentIndex = 0;

    public nextSlide(): void {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }

    public previousSlide(): void {
        this.currentIndex =
            (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }
}

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/menu-item-details.component.html`:

```html
<div class="breadcumb-section">
    <div class="breadcumb-wrapper truck-99">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcumb-content">
                        <h1 class="breadcumb-title">{{ menuItem?.title }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="about-section fix">
    <div class="about-wrapper section-padding style3">
        <ng-container *ngIf="!(isMobile$ | async)">
            <div class="shape2">
                <img
                    class="float-bob-x"
                    src="/img/shape/aboutShape3_2.png"
                    alt="shape"
                />
            </div>
            <div class="orange-shape">
                <img src="/img/about/orange-shape.png" alt="shape" />
            </div>
        </ng-container>
        <div class="container">
            <div class="row gx-60 gy-5">
                <div class="col-xl-6">
                    <div class="about-thumb-img">
                        <img
                            [src]="menuItem?.imageUrl ? '/' + menuItem?.imageUrl : '/img/dishes/default.png'"
                            [alt]="menuItem?.title"
                        />
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="about-content">
                        <div class="title-area">
                            <div
                                class="sub-title text-start wow fadeInUp"
                                data-wow-delay="0.5s"
                            >
                                <img
                                    class="me-1"
                                    src="/img/icon/titleIcon.svg"
                                    alt="icon"
                                />
                                Menu Item
                                <img
                                    class="ms-1"
                                    src="/img/icon/titleIcon.svg"
                                    alt="icon"
                                />
                            </div>
                            <h2
                                class="title text-start wow fadeInUp"
                                data-wow-delay="0.7s"
                            >
                                {{ menuItem?.title }}
                            </h2>
                            <div
                                class="text text-start wow fadeInUp"
                                data-wow-delay="0.8s"
                            >
                                {{ menuItem?.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

```

`/home/marcusshep/p/tgs/src/app/menu-item-details/menu-item-details.component.scss`:

```scss
.product-image {
    width: 438px;
    height: 390px;
    border-radius: 10px;
    z-index: 1;
}

.product-big-img {
    padding: 0 0 0 0;
}

.circle-shape {
    top: 20px !important;
}

@media (max-width: 1200px) {
    .about-thumb-img {
        width: 50%;
    }
}

@media (max-width: 768px) {
    .about-thumb-img {
        width: 100%;
    }
}

```