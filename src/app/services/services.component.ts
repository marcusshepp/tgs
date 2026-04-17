import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from './cms.service';
import { CmsServices, CmsHomeSection } from '../models/cms.types';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {
    public services: CmsServices | null = null;
    public teaser: CmsHomeSection | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getServices().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.services = data;
        });
        this.cms.getHome().pipe(takeUntil(this.destroy$)).subscribe(home => {
            this.teaser = home.servicesTeaser;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
