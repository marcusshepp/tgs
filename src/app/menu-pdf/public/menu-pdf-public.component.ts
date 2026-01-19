import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../../data/public-menu.model';

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

    isIOS = false;
    showIOSHint = false;
    private isBrowser = false;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }
    }

    ngOnInit() {
        this.menuItems = MENU_ITEMS.filter(item => item.active);
    }

    getItemsByCategory(categoryId: string): MenuItem[] {
        return this.menuItems.filter(item => item.category === categoryId);
    }

    printMenu() {
        if (!this.isBrowser) return;

        if (this.isIOS) {
            // On iOS, window.print() doesn't always work reliably
            // Try it first, then show hint if it doesn't seem to work
            try {
                window.print();
                // Show hint after a delay in case print dialog didn't appear
                setTimeout(() => {
                    this.showIOSHint = true;
                    setTimeout(() => this.showIOSHint = false, 8000);
                }, 500);
            } catch {
                this.showIOSHint = true;
                setTimeout(() => this.showIOSHint = false, 8000);
            }
        } else {
            window.print();
        }
    }
}
