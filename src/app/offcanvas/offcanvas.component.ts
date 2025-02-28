import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { CONTACT } from '../data/contact-info.model';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-offcanvas',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './offcanvas.component.html',
    styleUrl: './offcanvas.component.scss',
})
export class OffcanvasComponent {
    public socials = SOCIAL_MEDIA;
    public contact = CONTACT;
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.closeMobileNav();
            });
    }

    closeMobileNav() {
        if (isPlatformBrowser(this.platformId)) {
            const overlay = document.querySelector(
                '.offcanvas__overlay'
            ) as HTMLElement;
            const fixArea = document.querySelector(
                '.offcanvas__info'
            ) as HTMLElement;

            if (overlay && fixArea) {
                overlay.style.display = 'none';
                fixArea.classList.remove('info-open');
            }
        }
    }
}
