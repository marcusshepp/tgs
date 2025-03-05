import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
    animations: [],
})
export class ContactFormComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    submitting = false;
    formInitialized = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) {
        this.form = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            eventAddress: ['', Validators.required],
            phoneNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.pattern('^[0-9]*$'),
                ],
            ],
            email: ['', [Validators.required, Validators.email]],
            eventDate: ['', Validators.required],
            numberOfGuests: ['', [Validators.required, Validators.min(1)]],
            eventType: ['', Validators.required],
            message: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnInit(): void {
        const formElements = document.querySelectorAll(
            '.form-control, .form-select, .btn'
        );

        formElements.forEach((element, index) => {
            (element as HTMLElement).style.opacity = '0';
            (element as HTMLElement).style.transform = 'translateY(20px)';
            (element as HTMLElement).style.transition =
                'opacity 0.3s ease, transform 0.3s ease';

            setTimeout(
                () => {
                    (element as HTMLElement).style.opacity = '1';
                    (element as HTMLElement).style.transform = 'translateY(0)';
                },
                100 + index * 50
            );
        });

        this.form.valueChanges.subscribe(() => {
            this.cdr.detectChanges();
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.formInitialized = true;
            this.form.updateValueAndValidity();
            this.cdr.detectChanges();
        }, 100);
    }

    onSubmit() {
        this.form.updateValueAndValidity();

        if (this.form.valid && !this.submitting) {
            this.submitting = true;

            const submitBtn = document.querySelector(
                '.btn-primary'
            ) as HTMLButtonElement;
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending... <div class="spinner"></div>';
            }

            const apiUrl = `${environment.apiUrl}/TGS/ContactUs`;
            this.http.post(apiUrl, this.form.value).subscribe({
                next: () => {
                    this.showSuccessMessage();
                    this.form.reset();
                    Object.keys(this.form.controls).forEach((key) => {
                        this.form.get(key)?.setErrors(null);
                    });
                    this.submitting = false;

                    if (submitBtn) {
                        submitBtn.innerHTML =
                            'Submit Request <i class="arrow-right-long ms-2"></i>';
                    }
                },
                error: (err) => {
                    console.error('Failed to send email:', err);
                    alert(
                        'There was an error sending your request. Please try again.'
                    );
                    this.submitting = false;

                    if (submitBtn) {
                        submitBtn.innerHTML =
                            'Submit Request <i class="arrow-right-long ms-2"></i>';
                    }
                },
            });
        } else {
            Object.keys(this.form.controls).forEach((key) => {
                const control = this.form.get(key);
                control?.markAsTouched();
            });

            const firstError = document.querySelector('.text-danger');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }

    shouldShowError(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            (control?.invalid && (control?.touched || control?.dirty)) || false
        );
    }

    private showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your event request has been submitted successfully. We'll contact you shortly.</p>
        `;

        const formContainer = document.querySelector('.contact-form');
        const form = document.querySelector('form');

        if (formContainer && form) {
            form.style.opacity = '0';
            form.style.height = '0';
            form.style.overflow = 'hidden';
            form.style.transition = 'opacity 0.5s ease, height 0.5s ease';

            formContainer.appendChild(successMessage);

            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    formContainer.removeChild(successMessage);
                    form.style.opacity = '1';
                    form.style.height = 'auto';
                }, 500);
            }, 5000);
        }
    }
}
