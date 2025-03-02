import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { BannerComponent } from '../../banner/banner.component';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [ContactFormComponent, BannerComponent],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
