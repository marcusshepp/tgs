import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MobileMenuService {
    private isOpenSubject = new BehaviorSubject<boolean>(false);
    public isOpen$ = this.isOpenSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    get isOpen(): boolean {
        return this.isOpenSubject.value;
    }

    open(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.isOpenSubject.next(true);
            document.body.classList.add('no-scroll');
        }
    }

    close(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.isOpenSubject.next(false);
            document.body.classList.remove('no-scroll');
        }
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}
