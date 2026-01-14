import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CONTACT_INFO, ContactInfo, GOOD_TO_KNOW_ITEMS, GoodToKnowItem, MENU_SECTIONS, MenuSection } from '../../data/catering-menu.model';

@Component({
    selector: 'app-catering-menu',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './catering-menu.component.html',
    styleUrl: './catering-menu.component.scss',
})
export class CateringMenuComponent {
    isBrowser: boolean;
    activeTab: string = 'beef';
    menuSections: MenuSection[] = MENU_SECTIONS;
    goodToKnowItems: GoodToKnowItem[] = GOOD_TO_KNOW_ITEMS;
    contactInfo: ContactInfo = CONTACT_INFO;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.initAnimations();

            setTimeout(() => {
                const activeSection = document.querySelector('.menu-section.visible');
                if (activeSection) {
                    const menuItems = activeSection.querySelectorAll('.menu-item');
                    menuItems.forEach((item, index) => {
                        (item as any).style.opacity = '1';
                        (item as any).style.transform = 'translateY(0)';
                        (item as any).classList.add('animate-item');
                    });
                }
            }, 300);
        }
    }

    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
        this.animateMenuItems();
    }

    private initAnimations() {
        setTimeout(() => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const animatedElements = document.querySelectorAll(
                '.feature-item, .package-card'
            );
            animatedElements.forEach((el) => observer.observe(el));

            const subTitles = document.querySelectorAll('.sub-title');
            subTitles.forEach((el) => observer.observe(el));

            const menuContainer = document.querySelector('.menu-container');
            if (menuContainer) {
                observer.observe(menuContainer);
            }
        }, 100);
    }

    private animateMenuItems(): void {
        if (!this.isBrowser) return;

        const activeSection = document.querySelector('.menu-section.visible');
        if (!activeSection) return;

        const menuItems = activeSection.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            item.classList.remove('animate-item');
            (item as any).style.opacity = '0';
            (item as any).style.transform = 'translateY(20px)';
        });

        void (activeSection as any).offsetWidth;

        setTimeout(() => {
            const activeSection = document.querySelector('.menu-section.visible');
            if (!activeSection) return;

            const menuItems = activeSection.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    (item as any).style.opacity = '1';
                    (item as any).style.transform = 'translateY(0)';
                    item.classList.add('animate-item');
                }, index * 50);
            });
        }, 50);
    }
}
