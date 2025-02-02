import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { FullMenuComponent } from '../../full-menu/full-menu.component';

@Component({
    selector: 'app-contact-us',
    imports: [ContactFormComponent, FullMenuComponent],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    public menuClosed(isClosed: boolean): void {
        console.log('Menu closed:', isClosed);
    }
}
