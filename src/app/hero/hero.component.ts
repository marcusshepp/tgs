import { Component } from '@angular/core';
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
export class HeroComponent {
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(private mobileService: MobileService) {
        this.isHandset$ = this.mobileService.isHandset();
    }
}
