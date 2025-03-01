import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    PLATFORM_ID,
    ElementRef,
    ViewChild,
    AfterViewInit,
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
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('heroSection') heroSection: ElementRef;
    @ViewChild('heroBottom') heroBottom: ElementRef;

    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mobileService: MobileService
    ) {
        this.isHandset$ = this.mobileService.isMobile$;
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('resize', this.adjustHeights);
        }
    }

    ngAfterViewInit(): void {
        // Adjust after view is initialized and then on resize
        setTimeout(() => {
            this.adjustHeights();
        }, 100);
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.removeEventListener('resize', this.adjustHeights);
        }
    }

    private adjustHeights = (): void => {
        if (isPlatformBrowser(this.platformId)) {
            //const heroSection = this.heroSection?.nativeElement;
            //const heroBottom = this.heroBottom?.nativeElement;
            //
            //if (heroSection && heroBottom) {
            //    // Make sure the hero section is tall enough to contain its content
            //    const contentHeight = heroSection.scrollHeight;
            //    const viewportHeight = window.innerHeight;
            //
            //    // Calculate the effective height (minimum viewport height or content height)
            //    const effectiveHeight = Math.max(viewportHeight, contentHeight);
            //
            //    // Set section height
            //    heroSection.style.height = `${effectiveHeight}px`;
            //
            //    // Make sure the bottom bar has sufficient height for its content
            //    if (heroBottom) {
            //        // Reset to auto-height to get the natural height
            //        heroBottom.style.height = 'auto';
            //
            //        // Get computed style
            //        const bottomBarHeight = heroBottom.scrollHeight;
            //
            //        // Ensure it's never smaller than its content
            //        heroBottom.style.minHeight = `${bottomBarHeight}px`;
            //    }
            //}
        }
    };
}
