import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsMeetUs } from '../models/cms.types';
import { PageTitleComponent } from '../page-title/page-title.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
    selector: 'app-meet-us',
    standalone: true,
    imports: [PageTitleComponent, CommonModule, BannerComponent],
    templateUrl: './meet-us.component.html',
    styleUrl: './meet-us.component.scss',
})
export class MeetUsComponent implements OnInit, OnDestroy {
    public meetUs: CmsMeetUs | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getMeetUs().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.meetUs = data;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getBioParagraphs(bio: string): string[] {
        return bio.split('\n\n').filter(p => p.trim().length > 0);
    }

    getStoryParagraphs(): string[] {
        return this.meetUs ? this.getBioParagraphs(this.meetUs.body) : [];
    }
}
