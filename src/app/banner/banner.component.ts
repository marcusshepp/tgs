import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit, ElementRef, Renderer2, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CmsService } from '../services/cms.service';

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="hero-section">
            <div class="hero-wrapper" [ngClass]="variant">
                <div class="hero-content">
                    <h1 *ngIf="title" class="hero-title">{{ title }}</h1>
                    <ng-content></ng-content>
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, OnDestroy {
    @Input() variant: string = '';
    @Input() title: string = '';
    @Input() height: string = '';

    private resizeObserver: ResizeObserver | null = null;
    private readonly DESKTOP_BREAKPOINT: number = 768;
    private readonly DESKTOP_ADDITIONAL_HEIGHT: number = 300;
    private isBrowser: boolean;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private cms: CmsService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
        if (this.height && this.isBrowser) {
            this.applyResponsiveHeight();
            this.setupResizeObserver();
        }
    }

    ngOnDestroy(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    private applyResponsiveHeight(): void {
        if (!this.isBrowser) return;
        
        const wrapper: HTMLElement | null = this.el.nativeElement.querySelector('.hero-wrapper');
        const section: HTMLElement | null = this.el.nativeElement.querySelector('.hero-section');

        if (wrapper && section) {
            const heightValue: string = this.calculateHeight();

            this.renderer.setStyle(wrapper, 'height', heightValue);
            this.renderer.setStyle(section, 'height', heightValue);
        }
    }

    private calculateHeight(): string {
        const isDesktop: boolean = window.innerWidth >= this.DESKTOP_BREAKPOINT;

        if (!isDesktop) {
            return this.height;
        }

        const numericHeight: number = this.parseHeight(this.height);
        if (numericHeight === 0) {
            return this.height;
        }

        const desktopHeight: number = numericHeight + this.DESKTOP_ADDITIONAL_HEIGHT;
        const unit: string = this.extractUnit(this.height);

        return `${desktopHeight}${unit}`;
    }

    private parseHeight(height: string): number {
        const numericValue: number = parseFloat(height);
        return isNaN(numericValue) ? 0 : numericValue;
    }

    private extractUnit(height: string): string {
        const match: RegExpMatchArray | null = height.match(/[a-z%]+$/i);
        return match ? match[0] : 'px';
    }

    private setupResizeObserver(): void {
        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', this.handleResize.bind(this));
            return;
        }

        this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
        this.resizeObserver.observe(document.documentElement);
    }

    private handleResize(): void {
        this.applyResponsiveHeight();
    }
}
