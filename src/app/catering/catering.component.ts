import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';

@Component({
    selector: 'app-catering',
    standalone: true,
    imports: [ContactFormComponent],
    templateUrl: './catering.component.html',
    styleUrl: './catering.component.scss',
})
export class CateringComponent {}
