import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../data/public-menu.model';
import { CommonModule } from '@angular/common';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-menu-item-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-item-details.component.html',
    styleUrl: './menu-item-details.component.scss',
})
export class MenuItemDetailsComponent implements OnInit {
    public menu: MenuItem[] = MENU_ITEMS;
    public menuItemId!: string;
    public menuItem!: MenuItem | undefined;
    public isMobile$: Observable<boolean>;
    public relatedItems: MenuItem[] = [];
    public quantity: number = 1;
    public nutritionVisible: boolean = false;

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

            if (this.menuItem) {
                this.loadRelatedItems();
            }
        });
    }

    private loadRelatedItems(): void {
        if (this.menuItem && this.menuItem.category) {
            this.relatedItems = this.menu
                .filter(
                    (item) =>
                        item.category === this.menuItem?.category &&
                        item.id !== this.menuItem?.id
                )
                .slice(0, 3);
        }
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
        if (this.menuItem?.active) {
            console.log(
                `Adding ${this.quantity} of ${this.menuItem?.title} to cart`
            );
        }
    }

    public toggleNutrition(): void {
        this.nutritionVisible = !this.nutritionVisible;
    }
}
