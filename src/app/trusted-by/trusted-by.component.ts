import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../services/cms.service';
import { CmsTrustedBy } from '../models/cms.types';

@Component({
    selector: 'app-trusted-by',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trusted-by.component.html',
    styleUrls: ['./trusted-by.component.scss'],
})
export class TrustedByComponent implements OnInit, OnDestroy {
    public trustedBy: CmsTrustedBy | null = null;
    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getTrustedBy().pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.trustedBy = data;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
