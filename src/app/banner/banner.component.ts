import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

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
export class BannerComponent implements OnInit {
    @Input() variant: string = '';
    @Input() title: string = '';
    @Input() height: string = '';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        if (this.height) {
            const wrapper =
                this.el.nativeElement.querySelector('.hero-wrapper');
            const section =
                this.el.nativeElement.querySelector('.hero-section');
            if (wrapper && section) {
                this.renderer.setStyle(wrapper, 'height', this.height);
                this.renderer.setStyle(section, 'height', this.height);
            }
        }
    }
}
