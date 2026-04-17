import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../../services/cms.service';
import { CmsCateringItem, CmsGoodToKnowItem } from '../../models/cms.types';

interface CateringPdfSection {
    id: string;
    label: string;
    items: CmsCateringItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
    beef: '100% Halal Beef',
    poultry: 'Poultry',
    vegetarian: 'Vegetarian',
    pork: 'Pork',
    additional: 'Additional',
    sides: 'Sides',
};

const CATEGORY_ORDER = ['beef', 'poultry', 'vegetarian', 'pork', 'additional', 'sides'];

@Component({
    selector: 'app-menu-pdf-catering',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf-catering.component.html',
    styleUrl: './menu-pdf-catering.component.scss',
})
export class MenuPdfCateringComponent implements OnInit, OnDestroy {
    menuSections: CateringPdfSection[] = [];
    goodToKnow: CmsGoodToKnowItem[] = [];
    contactPhone: string = '';
    contactEmail: string = '';

    isIOS = false;
    showIOSHint = false;
    private isBrowser = false;
    private destroy$ = new Subject<void>();

    constructor(
        private cms: CmsService,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }
    }

    ngOnInit() {
        this.cms.getCateringItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menuSections = CATEGORY_ORDER
                .filter(cat => items.some(i => i.category === cat))
                .map(cat => ({
                    id: cat,
                    label: CATEGORY_LABELS[cat] ?? cat,
                    items: items.filter(i => i.category === cat),
                }));
        });

        this.cms.getCatering().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.goodToKnow = data.goodToKnow;
        });

        this.cms.getContact().pipe(takeUntil(this.destroy$)).subscribe(contact => {
            this.contactPhone = contact.phone;
            this.contactEmail = contact.email;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
