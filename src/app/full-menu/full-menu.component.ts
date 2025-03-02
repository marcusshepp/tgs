import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
    Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { MENU_ITEMS, MenuItem } from '../data/menu.model';
import { BannerComponent } from '../banner/banner.component';

@Component({
    selector: 'app-full-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, BannerComponent],
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
export class FullMenuComponent implements OnInit {
    public menu: MenuItem[] = MENU_ITEMS;
    @Input() public showMenu = true;
    @Output() public menuClosedEvent: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    public isBrowser: boolean;

    constructor(
        private router: Router,
        private meta: Meta,
        private title: Title,
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

            this.initAnimations();
        }
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

    public goToMenuItem(id: string): void {
        this.router.navigate(['menu-item', id]);
    }

    public closeMenu(): void {
        this.menuClosedEvent.emit(true);
    }
}
