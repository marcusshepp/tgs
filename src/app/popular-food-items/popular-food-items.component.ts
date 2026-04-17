import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsMenuItem, CmsHomeMenuTeaser } from '../models/cms.types';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
    selector: 'app-popular-food-items',
    standalone: true,
    imports: [PageTitleComponent, RouterModule, CommonModule],
    templateUrl: './popular-food-items.component.html',
    styleUrls: ['./popular-food-items.component.scss'],
})
export class PopularFoodItemsComponent implements OnInit, OnDestroy {
    public menu: CmsMenuItem[] = [];
    public teaser: CmsHomeMenuTeaser | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getHome().pipe(takeUntil(this.destroy$)).subscribe(home => {
            this.teaser = home.homeMenuTeaser;
        });
        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menu = items.filter(i => i.popular).slice(0, 4);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
