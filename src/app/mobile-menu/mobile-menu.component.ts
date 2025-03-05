import {
    Component,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { CONTACT } from '../data/contact-info.model';
import { MobileMenuService } from '../services/mobile-menu.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
    selector: 'app-mobile-menu',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent implements OnInit, OnDestroy {
    public socials = SOCIAL_MEDIA;
    public contact = CONTACT;
    public isOpen = false;
    private destroy$ = new Subject<void>();

    constructor(
        private mobileMenuService: MobileMenuService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.mobileMenuService.isOpen$
            .pipe(takeUntil(this.destroy$))
            .subscribe((isOpen) => {
                this.isOpen = isOpen;
            });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.closeMenu();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closeMenu(): void {
        this.mobileMenuService.close();
    }

    onBackdropClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.closeMenu();
        }
    }
}
