import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
export class BannerComponent {
    @Input() variant: string = '';
    @Input() title: string = '';
}
