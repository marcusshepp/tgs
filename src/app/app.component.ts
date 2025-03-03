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
import { isPlatformBrowser } from '@angular/common';
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
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private metaService: Meta,
        private router: Router,
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
        if (isPlatformBrowser(this.platformId)) {
            this.initRouteEvents();
        }
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
                if (data['title']) {
                    this.titleService.setTitle(
                        `${data['title']} | YourSiteName`
                    );
                }
                if (data['description']) {
                    this.metaService.updateTag({
                        name: 'description',
                        content: data['description'],
                    });
                }
                window.scrollTo(0, 0);
            });
    }
}
