import { Component, OnInit, OnDestroy } from '@angular/core';
import { CONTACT } from '../data/contact-info.model';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(private mobileService: MobileService) {
        this.isHandset$ = this.mobileService.isHandset();
    }

    ngOnInit(): void {
        this.initializeLayout();
        window.addEventListener('resize', this.initializeLayout);
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.initializeLayout);
    }

    private initializeLayout = (): void => {
        this.setMinHeight();
        this.centerContent();
    };

    private setMinHeight = (): void => {
        const bottomBar = document.querySelector('.banner-bottom');
        const bannerSection = document.querySelector('.banner-section');

        if (bottomBar && bannerSection) {
            const viewportHeight = window.innerHeight;
            const bottomBarHeight = bottomBar.clientHeight || 0;
            const minHeightNeeded = viewportHeight;

            bannerSection.setAttribute(
                'style',
                `min-height: ${minHeightNeeded}px`
            );
        }
    };

    private centerContent = (): void => {
        const container = document.querySelector('.container');
        const titleSection = document.querySelector('.title-section');
        const burgerSection = document.querySelector('.burger-section');
        const buttonSection = document.querySelector('.button-section');

        if (container && titleSection && burgerSection && buttonSection) {
            const containerHeight = container.clientHeight;
            const titleHeight = titleSection.clientHeight;
            const burgerHeight = burgerSection.clientHeight;
            const buttonHeight = buttonSection.clientHeight;

            const totalContentHeight =
                titleHeight + burgerHeight + buttonHeight;
            const topMargin = Math.max(
                0,
                (containerHeight - totalContentHeight) / 2
            );

            titleSection.setAttribute('style', `margin-top: ${topMargin}px`);
        }
    };
}
