import { Component } from '@angular/core';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { CONTACT } from '../data/contact-info.model';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../data/public-menu.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    public socials = SOCIAL_MEDIA;
    public contact = CONTACT;
    public menu: MenuItem[] = MENU_ITEMS.slice(0, 5);
}
