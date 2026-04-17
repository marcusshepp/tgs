import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
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
        combineLatest([this.cms.getHomeMenuTeaser(), this.cms.getMenuItems()]).pipe(
            takeUntil(this.destroy$),
            map(([teaser, all]) => {
                const slugs = teaser.popularItemSlugs;
                const items = slugs
                    .map(slug => all.find(i => i.slug === slug))
                    .filter((i): i is CmsMenuItem => !!i);
                return { teaser, items };
            }),
        ).subscribe(({ teaser, items }) => {
            this.teaser = teaser;
            this.items = items;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
