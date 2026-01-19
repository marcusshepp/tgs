import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_SECTIONS, MenuSection, GOOD_TO_KNOW_ITEMS, CONTACT_INFO } from '../../data/catering-menu.model';

@Component({
    selector: 'app-menu-pdf-catering',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf-catering.component.html',
    styleUrl: './menu-pdf-catering.component.scss',
})
export class MenuPdfCateringComponent implements OnInit {
    menuSections: MenuSection[] = [];
    goodToKnow = GOOD_TO_KNOW_ITEMS;
    contact = CONTACT_INFO;

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
        this.menuSections = MENU_SECTIONS;
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
