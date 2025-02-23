import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            eventAddress: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            eventDate: ['', Validators.required],
            numberOfGuests: ['', [Validators.required, Validators.min(1)]],
            eventType: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const apiUrl = `${environment.apiUrl}/tgs/contactus`;
            this.http.post(apiUrl, this.form.value).subscribe({
                next: () => alert('Email sent successfully!'),
                error: (err) => console.error('Failed to send email:', err),
            });
        }
    }

    shouldShowError(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            (control?.invalid && (control?.touched || control?.dirty)) || false
        );
    }
}
