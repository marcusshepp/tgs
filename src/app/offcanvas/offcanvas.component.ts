import { Component } from '@angular/core';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { CONTACT } from '../data/contact-info.model';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.closeMobileNav();
            });
    }

    closeMobileNav() {
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
