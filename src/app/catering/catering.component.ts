import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BannerComponent } from '../banner/banner.component';
import { CateringMenuComponent } from './menu/catering-menu.component';
import { CmsService } from '../services/cms.service';
import { CmsCatering } from '../models/cms.types';

@Component({
    selector: 'app-catering',
    standalone: true,
    imports: [
        CommonModule,
        BannerComponent,
        ContactFormComponent,
        RouterModule,
        CateringMenuComponent,
    ],
    templateUrl: './catering.component.html',
    styleUrl: './catering.component.scss',
})
export class CateringComponent implements OnInit, OnDestroy {
    catering: CmsCatering | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit() {
        this.cms.getCatering().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.catering = data;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
