import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../../services/cms.service';
import { CmsMenuItem, CmsMenuItemCategory } from '../../models/cms.types';

@Component({
    selector: 'app-menu-pdf-public',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf-public.component.html',
    styleUrl: './menu-pdf-public.component.scss',
})
export class MenuPdfPublicComponent implements OnInit, OnDestroy {
    menuItems: CmsMenuItem[] = [];

    isIOS = false;
    showIOSHint = false;
    private isBrowser = false;
    private destroy$ = new Subject<void>();

    constructor(
        private cms: CmsService,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }
    }

    ngOnInit() {
        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menuItems = items.filter(item => item.available);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getItemsByCategory(categoryId: CmsMenuItemCategory): CmsMenuItem[] {
        return this.menuItems.filter(item => item.category === categoryId);
    }

    printMenu() {
        if (!this.isBrowser) return;

        if (this.isIOS) {
            // On iOS, window.print() doesn't always work reliably
            // Try it first, then show hint if it doesn't seem to work
            try {
                window.print();
                // Show hint after a delay in case print dialog didn't appear
                setTimeout(() => {
                    this.showIOSHint = true;
                    setTimeout(() => this.showIOSHint = false, 8000);
                }, 500);
            } catch {
                this.showIOSHint = true;
                setTimeout(() => this.showIOSHint = false, 8000);
            }
        } else {
            window.print();
        }
    }
}
