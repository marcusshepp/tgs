import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    PLATFORM_ID,
    HostListener,
} from '@angular/core';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { CONTACT } from '../data/contact-info.model';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MobileService } from '../services/mobile.service';
import { PreloaderComponent } from '../preloader/preloader.component';
import { MobileMenuService } from '../services/mobile-menu.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, PreloaderComponent, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
    public socials = SOCIAL_MEDIA;
    public contact = CONTACT;
    public isMobile = false;
    public isScrolled = false;
    private destroy$ = new Subject<void>();
    private scrollThreshold = 50;

    constructor(
        private mobileService: MobileService,
        private mobileMenuService: MobileMenuService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.checkScreenSize();
            this.checkScrollPosition();
            this.mobileService.isMobile$
                .pipe(takeUntil(this.destroy$))
                .subscribe((isMobile) => {
                    this.isMobile = isMobile;
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('window:resize')
    onResize(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.checkScreenSize();
        }
    }

    @HostListener('window:scroll')
    onScroll(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.checkScrollPosition();
        }
    }

    private checkScreenSize(): void {
        const width = window.innerWidth;
        this.mobileService.setMobile(width < 1200);
    }

    private checkScrollPosition(): void {
        this.isScrolled = window.scrollY > this.scrollThreshold;
    }

    scrollToTop(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    toggleMobileMenu(): void {
        this.mobileMenuService.toggle();
    }
}
