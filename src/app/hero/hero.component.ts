import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { CONTACT } from '../data/contact-info.model';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mobileService: MobileService
    ) {
        this.isHandset$ = this.mobileService.isHandset();
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.setMinHeight();
            window.addEventListener('resize', this.setMinHeight);
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.removeEventListener('resize', this.setMinHeight);
        }
    }

    private setMinHeight = (): void => {
        if (isPlatformBrowser(this.platformId)) {
            const bottomBar = document.querySelector('.banner-bottom');
            const bannerSection = document.querySelector('.banner-section');

            if (bottomBar && bannerSection) {
                const viewportHeight = window.innerHeight;
                const minHeightNeeded = viewportHeight;

                bannerSection.setAttribute(
                    'style',
                    `min-height: ${minHeightNeeded}px`
                );
            }
        }
    };
}
