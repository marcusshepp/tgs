import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-contact-us',
    imports: [ContactFormComponent],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    public menuClosed(isClosed: boolean): void {
        console.log('Menu closed:', isClosed);
    }
}
