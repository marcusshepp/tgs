import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../../services/cms.service';
import { CmsCateringItem, CmsGoodToKnowItem } from '../../models/cms.types';

interface CateringSection {
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
    selector: 'app-catering-menu',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './catering-menu.component.html',
    styleUrl: './catering-menu.component.scss',
})
export class CateringMenuComponent implements OnInit, OnDestroy {
    isBrowser: boolean;
    activeTab: string = 'beef';
    menuSections: CateringSection[] = [];
    goodToKnowItems: CmsGoodToKnowItem[] = [];
    contactEmail: string = '';
    contactPhone: string = '';
    private destroy$ = new Subject<void>();

    constructor(
        private cms: CmsService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
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
            this.goodToKnowItems = data.goodToKnow;
        });

        this.cms.getContact().pipe(takeUntil(this.destroy$)).subscribe(contact => {
            this.contactEmail = contact.email;
            this.contactPhone = contact.phone;
        });

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
        this.animateMenuItems();
    }

    private animateMenuItems(): void {
        if (!this.isBrowser) return;

        const activeSection = document.querySelector('.menu-section.visible');
        if (!activeSection) return;

        const menuItems = activeSection.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            item.classList.remove('animate-item');
            (item as HTMLElement).style.opacity = '0';
            (item as HTMLElement).style.transform = 'translateY(20px)';
        });

        void (activeSection as HTMLElement).offsetWidth;

        setTimeout(() => {
            const activeSection = document.querySelector('.menu-section.visible');
            if (!activeSection) return;

            const menuItems = activeSection.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    (item as HTMLElement).style.opacity = '1';
                    (item as HTMLElement).style.transform = 'translateY(0)';
                    (item as HTMLElement).classList.add('animate-item');
                }, index * 50);
            });
        }, 50);
    }
}
