import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsMenuItem } from '../models/cms.types';
import { MobileService } from '../services/mobile.service';

@Component({
    selector: 'app-menu-item-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-item-details.component.html',
    styleUrl: './menu-item-details.component.scss',
})
export class MenuItemDetailsComponent implements OnInit, OnDestroy {
    public menuItem: CmsMenuItem | undefined;
    public relatedItems: CmsMenuItem[] = [];
    public quantity: number = 1;
    public nutritionVisible: boolean = false;
    public loading: boolean = true;
    public isMobile$: Observable<boolean>;
    private destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private cms: CmsService,
        private mobileService: MobileService
    ) {
        this.isMobile$ = this.mobileService.showMobileMenu$();
    }

    public ngOnInit(): void {
        this.route.params.pipe(
            takeUntil(this.destroy$),
            switchMap(params => {
                const slug: string = params['id'];
                return this.cms.getMenuItemBySlug(slug);
            })
        ).subscribe({
            next: (item) => {
                this.menuItem = item;
                this.loading = false;
                this.loadRelatedItems();
            },
            error: () => {
                this.menuItem = undefined;
                this.loading = false;
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadRelatedItems(): void {
        if (!this.menuItem) return;
        const currentCategory = this.menuItem.category;
        const currentSlug = this.menuItem.slug;

        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.relatedItems = items
                .filter(item => item.category === currentCategory && item.slug !== currentSlug)
                .slice(0, 3);
        });
    }

    public incrementQuantity(): void {
        if (this.quantity < 10) {
            this.quantity++;
        }
    }

    public decrementQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    public addToCart(): void {
        if (this.menuItem?.available) {
            console.log(
                `Adding ${this.quantity} of ${this.menuItem?.name} to cart`
            );
        }
    }

    public toggleNutrition(): void {
        this.nutritionVisible = !this.nutritionVisible;
    }
}
