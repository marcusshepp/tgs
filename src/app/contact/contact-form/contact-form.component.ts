import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.scss',
    animations: [],
})
export class ContactFormComponent implements OnInit, AfterViewInit {
    @ViewChild('formContainer') formContainer!: ElementRef;
    @ViewChild('formElement') formElement!: ElementRef;

    public form: FormGroup;
    private submitting: boolean = false;
    private formInitialized: boolean = false;
    private isBrowser: boolean;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private cdr: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
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

    public ngOnInit(): void {
        if (this.isBrowser) {
            setTimeout(() => {
                const formElements: NodeListOf<Element> | null = document.querySelectorAll(
                    '.form-control, .form-select, .btn, .form-label'
                );

                if (formElements) {
                    formElements.forEach((element: Element, index: number) => {
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
                }
            });
        }

        this.form.valueChanges.subscribe(() => {
            this.cdr.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        if (this.isBrowser) {
            setTimeout(() => {
                this.formInitialized = true;
                this.form.updateValueAndValidity();
                this.cdr.detectChanges();
            }, 100);
        }
    }

    public onSubmit(): void {
        this.form.updateValueAndValidity();

        if (this.form.valid && !this.submitting) {
            this.submitting = true;

            let submitBtn: HTMLButtonElement | null = null;

            if (this.isBrowser) {
                submitBtn = document.querySelector('.btn-primary') as HTMLButtonElement;
                if (submitBtn) {
                    submitBtn.innerHTML = 'Sending... <div class="spinner"></div>';
                }
            }

            const apiUrl: string = `${environment.apiUrl}/TGS/ContactUs`;
            this.http.post(apiUrl, this.form.value).subscribe({
                next: () => {
                    if (this.isBrowser) {
                        const fullName: string = this.form.get('fullName')?.value || 'valued customer';
                        this.showSuccessMessage(fullName);
                    }

                    this.form.reset();
                    Object.keys(this.form.controls).forEach((key: string) => {
                        this.form.get(key)?.setErrors(null);
                    });
                    this.submitting = false;

                    if (this.isBrowser && submitBtn) {
                        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
                    }
                },
                error: (err: any) => {
                    console.error('Failed to send email:', err);

                    if (this.isBrowser) {
                        alert('There was an error sending your request. Please try again.');
                    }

                    this.submitting = false;

                    if (this.isBrowser && submitBtn) {
                        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
                    }
                },
            });
        } else {
            Object.keys(this.form.controls).forEach((key: string) => {
                const control = this.form.get(key);
                control?.markAsTouched();
            });

            if (this.isBrowser) {
                const firstError: Element | null = document.querySelector('.text-danger');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }
        }
    }

    public shouldShowError(controlName: string): boolean {
        const control = this.form.get(controlName);
        return (
            (control?.invalid && (control?.touched || control?.dirty)) || false
        );
    }

    private showSuccessMessage(customerName: string): void {
        if (!this.isBrowser || !this.formContainer || !this.formElement) {
            return;
        }

        const successMessage: HTMLDivElement = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>Thank You, ${customerName}!</h3>
            <p class="mb-4">Your event request has been submitted successfully. We'll contact you within 24 hours.</p>
            <p class="mb-4">In the meantime, why not check out:</p>
            <div class="success-links">
                <a href="/menu" class="btn btn-outline">
                    <i class="fas fa-utensils me-2"></i>Our Menu
                </a>
                <a href="/catering" class="btn btn-outline">
                    <i class="fas fa-concierge-bell me-2"></i>Catering Services
                </a>
            </div>
        `;

        const formContainer: HTMLElement = this.formContainer.nativeElement;
        const form: HTMLElement = this.formElement.nativeElement;

        if (formContainer && form) {
            (form as any).style.opacity = '0';
            (form as any).style.height = '0';
            (form as any).style.overflow = 'hidden';
            (form as any).style.transition = 'opacity 0.5s ease, height 0.5s ease';

            formContainer.appendChild(successMessage);

        }
    }
}
