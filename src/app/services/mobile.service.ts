import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MobileService {
    private _isMobile = new BehaviorSubject<boolean>(false);
    public isMobileNavOpen = new BehaviorSubject<boolean>(false);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.checkScreenSize();
            window.addEventListener('resize', () => this.checkScreenSize());
        }
    }

    private checkScreenSize(): void {
        this._isMobile.next(window.innerWidth < 1200);
    }

    public setMobile(isMobile: boolean): void {
        this._isMobile.next(isMobile);
    }

    get isMobile$(): Observable<boolean> {
        return this._isMobile.asObservable();
    }

    showMobileMenu$(): Observable<boolean> {
        return this._isMobile.asObservable();
    }
}
