import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-special-events',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './special-events.component.html',
    styleUrl: './special-events.component.scss',
})
export class SpecialEventsComponent {
    isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
}
