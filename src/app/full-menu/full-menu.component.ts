import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    OnDestroy,
    Output,
    PLATFORM_ID,
    Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { CmsService } from '../services/cms.service';
import { CmsMenuItem } from '../models/cms.types';
import { BannerComponent } from '../banner/banner.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
    selector: 'app-full-menu',
    standalone: true,
    imports: [
        PageTitleComponent,
        CommonModule,
        RouterModule,
        BannerComponent,
        FormsModule
    ],
    templateUrl: './full-menu.component.html',
    styleUrl: './full-menu.component.scss',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate(
                    '0.4s ease-out',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
        ]),
    ],
})
export class FullMenuComponent implements OnInit, OnDestroy {
    public menu: CmsMenuItem[] = [];
    public filteredMenu: CmsMenuItem[] = [];
    public searchTerm: string = '';
    public activeFilter: string = 'all';
    public loading: boolean = true;
    private destroy$ = new Subject<void>();

    @Input() public showMenu = true;
    @Output() public menuClosedEvent: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    public isBrowser: boolean;

    constructor(
        private router: Router,
        private meta: Meta,
        private title: Title,
        private cms: CmsService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    public ngOnInit(): void {
        if (this.isBrowser) {
            this.title.setTitle(
                "Detroit's Best Slider Menu | TIM'S Gourmet Sliders"
            );
            this.meta.updateTag({
                name: 'description',
                content:
                    'Explore our delicious menu of freshly prepared Detroit-style sliders. From our famous NOT! So Basic to the Black And Blue steakhouse classic.',
            });
        }

        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menu = items.filter(item => item.available);
            this.filteredMenu = [...this.menu];
            this.loading = false;
            if (this.isBrowser) {
                setTimeout(() => this.initAnimations(), 100);
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initAnimations(): void {
        if (typeof window !== 'undefined') {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            setTimeout(() => {
                document.querySelectorAll('.menu-card').forEach((card) => {
                    observer.observe(card);
                });
            }, 100);
        }
    }

    public applyFilter(filter: string): void {
        this.activeFilter = filter;
        this.applyFilters();
    }

    public applyFilters(): void {
        let result = [...this.menu];

        if (this.activeFilter !== 'all') {
            result = result.filter(item => {
                if (this.activeFilter === 'beef' && item.category === 'beef') return true;
                if (this.activeFilter === 'pork' && item.category === 'pork') return true;
                if (this.activeFilter === 'chicken' && item.category === 'chicken') return true;
                if (this.activeFilter === 'sides' && item.category === 'other') return true;
                if (this.activeFilter === 'vegetarian' && item.isVegetarianOption) return true;
                if (this.activeFilter === 'spicy' && item.spiceLevel && item.spiceLevel > 1) return true;
                if (this.activeFilter === 'popular' && item.popular) return true;
                return false;
            });
        }

        if (this.searchTerm.trim()) {
            const searchLower = this.searchTerm.toLowerCase().trim();
            result = result.filter(item => {
                if (item.name.toLowerCase().includes(searchLower)) return true;
                if (item.description.toLowerCase().includes(searchLower)) return true;
                if (item.category.toLowerCase().includes(searchLower)) return true;
                if (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchLower))) return true;
                if (item.dietaryInfo && item.dietaryInfo.some(info => info.toLowerCase().includes(searchLower))) return true;
                return false;
            });
        }

        this.filteredMenu = result;

        setTimeout(() => {
            this.initAnimations();
        }, 100);
    }

    public resetFilters(): void {
        this.searchTerm = '';
        this.activeFilter = 'all';
        this.filteredMenu = [...this.menu];
    }

    public goToMenuItem(slug: string): void {
        this.router.navigate(['menu-item', slug]);
    }

    public closeMenu(): void {
        this.menuClosedEvent.emit(true);
    }
}
