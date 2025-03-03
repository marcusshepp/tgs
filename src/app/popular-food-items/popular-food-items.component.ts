import { Component } from '@angular/core';
import { MENU_ITEMS } from '../data/menu.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../page-title/page-title.component';

interface MenuItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price?: number;
}

@Component({
    selector: 'app-popular-food-items',
    standalone: true,
    imports: [PageTitleComponent, RouterModule, CommonModule],
    templateUrl: './popular-food-items.component.html',
    styleUrls: ['./popular-food-items.component.scss'],
})
export class PopularFoodItemsComponent {
    public menu = MENU_ITEMS.filter(item =>
        item.id === 'whiskey' ||
        item.id === 'sweet-savory' ||
        item.id === 'double-bacon' ||
        item.id === 'spicy-chicken'
    );

    public selectedDish: MenuItem | null = null;

    public openModal(dish: MenuItem): void {
        this.selectedDish = dish;
    }
}
