import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsMenuItem, CmsHomeMenuTeaser } from '../models/cms.types';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
    selector: 'app-home-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, PageTitleComponent],
    templateUrl: './home-menu.component.html',
    styleUrl: './home-menu.component.scss',
})
export class HomeMenuComponent implements OnInit, OnDestroy {
    public items: CmsMenuItem[] = [];
    public teaser: CmsHomeMenuTeaser | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getHome().pipe(takeUntil(this.destroy$)).subscribe(home => {
            this.teaser = home.homeMenuTeaser;
            this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(all => {
                const slugs = home.homeMenuTeaser.popularItemSlugs;
                this.items = slugs
                    .map(slug => all.find(i => i.slug === slug))
                    .filter((i): i is CmsMenuItem => !!i);
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
