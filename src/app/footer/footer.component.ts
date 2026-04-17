import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsBrand, CmsContact, CmsFooter, CmsMenuItem } from '../models/cms.types';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
    public brand: CmsBrand | null = null;
    public contact: CmsContact | null = null;
    public footer: CmsFooter | null = null;
    public menuItems: CmsMenuItem[] = [];
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getBrand().pipe(takeUntil(this.destroy$)).subscribe(b => { this.brand = b; });
        this.cms.getContact().pipe(takeUntil(this.destroy$)).subscribe(c => { this.contact = c; });
        this.cms.getFooter().pipe(takeUntil(this.destroy$)).subscribe(f => { this.footer = f; });
        this.cms.getMenuItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
            this.menuItems = items.filter(i => i.available).slice(0, 5);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
