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
    isIOS = false;
    showIOSHint = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }
    }

    downloadMenu() {
        if (!this.isBrowser) return;

        if (this.isIOS) {
            window.open('/img/events/stpatricks-menu.pdf', '_blank');
            this.showIOSHint = true;
            setTimeout(() => this.showIOSHint = false, 8000);
        } else {
            const link = document.createElement('a');
            link.href = '/img/events/stpatricks-menu.pdf';
            link.download = 'tgs-st-patricks-day-menu.pdf';
            link.click();
        }
    }
}
