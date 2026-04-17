import {
    Component,
    OnInit,
    OnDestroy,
    Inject,
    PLATFORM_ID,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { MobileService } from '../services/mobile.service';
import { CmsService } from '../services/cms.service';
import { CmsBrand, CmsContact, CmsHomeHero } from '../models/cms.types';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
    public brand: CmsBrand | null = null;
    public contact: CmsContact | null = null;
    public hero: CmsHomeHero | null = null;
    public isHandset$: Observable<boolean>;
    public videoLoaded = false;
    private destroy$ = new Subject<void>();

    @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mobileService: MobileService,
        private cms: CmsService,
    ) {
        this.isHandset$ = this.mobileService.isMobile$;
    }

    ngOnInit(): void {
        this.cms.getBrand().pipe(takeUntil(this.destroy$)).subscribe(b => { this.brand = b; });
        this.cms.getContact().pipe(takeUntil(this.destroy$)).subscribe(c => { this.contact = c; });
        this.cms.getHero().pipe(takeUntil(this.destroy$)).subscribe(h => { this.hero = h; });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId) && this.heroVideo?.nativeElement) {
            const video = this.heroVideo.nativeElement;
            video.muted = true;
            video.play().catch(() => {});
        }
    }

    onVideoReady(): void {
        this.videoLoaded = true;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
