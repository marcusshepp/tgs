import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
    selector: 'app-catering',
    standalone: true,
    imports: [
        CommonModule,
        BannerComponent,
        ContactFormComponent,
        RouterModule,
    ],
    templateUrl: './catering.component.html',
    styleUrl: './catering.component.scss',
})
export class CateringComponent {
    isBrowser: boolean;
    activeTab: string = 'beef';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.initAnimations();
            this.triggerInitialMenuAnimation();
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

    private triggerInitialMenuAnimation() {
        setTimeout(() => {
            const activeSection = document.querySelector('.menu-section.visible');
            if (activeSection) {
                const menuItems = activeSection.querySelectorAll('.menu-item');
                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-item');
                    }, index * 50);
                });
            }
        }, 300);
    }

    private animateMenuItems(): void {
        if (!this.isBrowser) return;

        const activeSection = document.querySelector('.menu-section.visible');
        if (!activeSection) return;

        const menuItems = activeSection.querySelectorAll('.menu-item');
        menuItems.forEach((item) => {
            item.classList.remove('animate-item');
        });

        void (activeSection as any).offsetWidth;

        setTimeout(() => {
            const activeSection = document.querySelector('.menu-section.visible');
            if (!activeSection) return;

            const menuItems = activeSection.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-item');
                }, index * 50);
            });
        }, 50);
    }
}
