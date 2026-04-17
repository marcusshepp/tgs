import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterOutlet,
} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FooterComponent,
        HeaderComponent,
        MobileMenuComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private readonly siteName = "Tim's Gourmet Sliders";
    private readonly siteUrl = 'https://www.timsgourmetsliders.com';
    private readonly defaultImage = 'https://cdn.syncgr.com/domains/timsgourmetsliders.com/d903fce5-2b7b-4cc8-9117-d9ff9dc07036.jpg';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private metaService: Meta,
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

    ngOnInit(): void {
        this.initRouteEvents();
    }

    private initRouteEvents(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data)
            )
            .subscribe((data) => {
                const title = data['title'] || this.siteName;
                const description =
                    data['description'] ||
                    "Tim's Gourmet Sliders serves delicious handcrafted sliders in Detroit & Redford, Michigan.";
                const fullTitle =
                    title === this.siteName
                        ? `${title} | Gourmet Food Truck Detroit & Redford MI`
                        : `${title} | ${this.siteName}`;

                // Set page title
                this.titleService.setTitle(fullTitle);

                // Update meta description
                this.metaService.updateTag({
                    name: 'description',
                    content: description,
                });

                // Update keywords if provided
                if (data['keywords']) {
                    this.metaService.updateTag({
                        name: 'keywords',
                        content: data['keywords'],
                    });
                }

                // Open Graph tags
                this.metaService.updateTag({
                    property: 'og:title',
                    content: fullTitle,
                });
                this.metaService.updateTag({
                    property: 'og:description',
                    content: description,
                });
                this.metaService.updateTag({
                    property: 'og:url',
                    content: `${this.siteUrl}${this.router.url}`,
                });

                // Twitter Card tags
                this.metaService.updateTag({
                    name: 'twitter:title',
                    content: fullTitle,
                });
                this.metaService.updateTag({
                    name: 'twitter:description',
                    content: description,
                });

                // Update canonical URL
                this.updateCanonicalUrl(`${this.siteUrl}${this.router.url}`);

                if (isPlatformBrowser(this.platformId)) {
                    window.scrollTo(0, 0);
                }
            });
    }

    private updateCanonicalUrl(url: string): void {
        let link: HTMLLinkElement | null =
            this.document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}
