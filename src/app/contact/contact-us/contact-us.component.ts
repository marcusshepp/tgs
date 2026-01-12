import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { RouterModule } from '@angular/router';
import { CONTACT } from '../../data/contact-info.model';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [ContactFormComponent, RouterModule],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    contact = CONTACT;
}
