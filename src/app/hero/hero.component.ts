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
import { CONTACT } from '../data/contact-info.model';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';
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
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;
    public videoLoaded = false;

    @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mobileService: MobileService
    ) {
        this.isHandset$ = this.mobileService.isMobile$;
    }

    ngOnInit(): void {}

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

    ngOnDestroy(): void {}
}
