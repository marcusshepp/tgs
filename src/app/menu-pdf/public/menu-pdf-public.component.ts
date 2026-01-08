import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../../data/menu.model';

@Component({
    selector: 'app-menu-pdf-public',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf-public.component.html',
    styleUrl: './menu-pdf-public.component.scss',
})
export class MenuPdfPublicComponent implements OnInit {
    menuItems: MenuItem[] = [];
    categories = [
        { id: 'beef', label: 'Beef Sliders' },
        { id: 'chicken', label: 'Chicken Sliders' },
        { id: 'pork', label: 'Pork Sliders' },
        { id: 'vegetarian', label: 'Vegetarian' },
        { id: 'other', label: 'Sides & More' },
    ];

    ngOnInit() {
        this.menuItems = MENU_ITEMS.filter(item => item.active);
    }

    getItemsByCategory(categoryId: string): MenuItem[] {
        return this.menuItems.filter(item => item.category === categoryId);
    }

    printMenu() {
        window.print();
    }
}
