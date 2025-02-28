import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    window.scrollTo(0, 0);
                }
            });
        }
    }
}
