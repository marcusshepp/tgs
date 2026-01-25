import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ElementRef, ViewChild, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
// Environment import removed - now posting directly to sync API
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
    @ViewChild('formContainer') private formContainer!: ElementRef;
    @ViewChild('formElement') private formElement!: ElementRef;
    @ViewChild('honeyPot') private honeyPot!: ElementRef;

    public form: FormGroup;
    public showSuccessMessage: boolean = false;
    public submittedName: string = '';

    private submitting: boolean = false;
    private formInitialized: boolean = false;
    private isBrowser: boolean;
    private userInteracted: boolean = false;
    private formStartTime: number = 0;
    private mouseMoveCount: number = 0;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);

        this.form = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2)]],
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
            eventLocation: ['', Validators.required],
            message: ['', [Validators.required, Validators.minLength(10)]],
            honeypot: ['', this.honeyPotValidator],
            formToken: [''],
            interactionScore: [0, [Validators.required, Validators.min(3)]]
        });
    }

    private honeyPotValidator(control: AbstractControl): ValidationErrors | null {
        return control.value ? { honeypot: true } : null;
    }

    private generateFormToken(): string {
        const randomStr: string = Math.random().toString(36).substring(2, 15);
        const timestamp: string = new Date().getTime().toString(36);
        return `${randomStr}${timestamp}`;
    }

    private trackUserInteraction(): void {
        if (!this.isBrowser) {
            return;
        }

        this.formStartTime = new Date().getTime();
        this.form.get('formToken')?.setValue(this.generateFormToken());

        document.addEventListener('mousemove', () => {
            this.ngZone.run(() => {
                if (!this.userInteracted) {
                    this.mouseMoveCount++;
                    if (this.mouseMoveCount > 5) {
                        this.userInteracted = true;
                        this.updateInteractionScore();
                    }
                }
            });
        });

        const formFields: NodeListOf<Element> = document.querySelectorAll('input, textarea, select');
        formFields.forEach((field: Element) => {
            field.addEventListener('focus', () => {
                this.ngZone.run(() => {
                    this.userInteracted = true;
                    this.updateInteractionScore();
                });
            });
        });

        document.addEventListener('keydown', () => {
            this.ngZone.run(() => {
                this.userInteracted = true;
                this.updateInteractionScore();
            });
        });
    }

    private updateInteractionScore(): void {
        const currentScore: number = this.form.get('interactionScore')?.value || 0;
        if (currentScore < 10) {
            this.form.get('interactionScore')?.setValue(currentScore + 1);
        }
    }

    private timeOnPageCheck(): boolean {
        const currentTime: number = new Date().getTime();
        const timeSpent: number = currentTime - this.formStartTime;
        return timeSpent > 3000;
    }

    public ngOnInit(): void {
        if (this.isBrowser) {
            this.trackUserInteraction();

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
            if (this.userInteracted) {
                this.updateInteractionScore();
            }
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

        const honeypotFilled: boolean = !!this.form.get('honeypot')?.value;
        const timeCheckPassed: boolean = this.timeOnPageCheck();
        const interactionScore: number = this.form.get('interactionScore')?.value || 0;

        if (honeypotFilled || !timeCheckPassed || interactionScore < 3) {
            console.log('Bot submission detected and blocked');

            if (this.isBrowser) {
                const fullName: string = this.form.get('fullName')?.value || 'valued customer';
                this.displaySuccessMessage(fullName);
            }

            return;
        }

        if (this.form.valid && !this.submitting) {
            this.submitting = true;

            let submitBtn: HTMLButtonElement | null = null;

            if (this.isBrowser) {
                submitBtn = document.querySelector('.btn-primary') as HTMLButtonElement;
                if (submitBtn) {
                    submitBtn.innerHTML = 'Sending... <div class="spinner"></div>';
                }
            }

            // POST directly to sync API
            const apiUrl: string = 'https://api.syncgr.com/contact';

            const formData: any = { ...this.form.value };
            delete formData.honeypot;
            delete formData.formToken;
            delete formData.interactionScore;

            // Build payload for sync contact API
            const payload = {
                to: 'timsfoodtruckdetroit@gmail.com',
                from: 'info@syncgr.com',
                subject: `Tim's Gourmet Sliders - New Catering Inquiry from ${formData.fullName}`,
                text: `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phoneNumber || 'Not provided'}\nEvent Date: ${formData.eventDate || 'Not specified'}\nEvent Location: ${formData.eventLocation || 'Not specified'}\n\nMessage:\n${formData.message}`,
                replyTo: formData.email,
                // Lead tracking fields
                domain: 'timsgourmetsliders.com',
                contactName: formData.fullName,
                contactPhone: formData.phoneNumber || undefined,
                contactMessage: formData.message,
                // Auto-reply confirmation email
                autoReply: {
                    enabled: true,
                    subject: "Thank you for your catering inquiry - Tim's Gourmet Sliders",
                    fromName: "Tim's Gourmet Sliders",
                    replyTo: 'timsfoodtruckdetroit@gmail.com',
                    body: `Hi ${formData.fullName},

Thank you for reaching out to Tim's Gourmet Sliders for your catering needs. We've received your inquiry and will get back to you within 24 hours with availability and pricing for your event on ${formData.eventDate}.

If you need immediate assistance, please call us at (248) 251-5781.

We look forward to making your event delicious!

Tim's Gourmet Sliders
(248) 251-5781
timsgourmetsliders.com`
                }
            };

            this.http.post(apiUrl, payload).subscribe({
                next: () => {
                    if (this.isBrowser) {
                        const fullName: string = this.form.get('fullName')?.value || 'valued customer';
                        this.displaySuccessMessage(fullName);
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
                const control: AbstractControl | null = this.form.get(key);
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
        const control: AbstractControl | null = this.form.get(controlName);
        return (
            (control?.invalid && (control?.touched || control?.dirty)) || false
        );
    }

    private displaySuccessMessage(customerName: string): void {
        this.submittedName = customerName;
        this.showSuccessMessage = true;
        this.cdr.detectChanges();
    }
}
