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

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.initAnimations();
        }
    }

    private initAnimations() {
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
    }
}
