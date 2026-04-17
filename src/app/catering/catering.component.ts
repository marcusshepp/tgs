import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BannerComponent } from '../banner/banner.component';
import { CateringMenuComponent } from './menu/catering-menu.component';
import { CmsService } from '../services/cms.service';
import { CmsCatering } from '../models/cms.types';

@Component({
    selector: 'app-catering',
    standalone: true,
    imports: [
        CommonModule,
        BannerComponent,
        ContactFormComponent,
        RouterModule,
        CateringMenuComponent,
    ],
    templateUrl: './catering.component.html',
    styleUrl: './catering.component.scss',
})
export class CateringComponent implements OnInit, OnDestroy {
    isBrowser: boolean;
    catering: CmsCatering | null = null;
    private destroy$ = new Subject<void>();

    constructor(
        private cms: CmsService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        this.cms.getCatering().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.catering = data;
        });

        if (this.isBrowser) {
            this.initAnimations();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
}
