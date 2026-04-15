import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsService } from '../../services/cms.service';
import { CmsContact } from '../../models/cms.types';

const EMPTY_CONTACT: CmsContact = {
    email: '',
    phone: '',
    phoneLink: '',
    address: '',
    hours: '',
    googleMapsUrl: '',
    serviceArea: '',
    serviceAreaNote: '',
    responseTime: '',
    sectionHeading: '',
    sideImageUrl: '',
    pdfFooterLine: '',
    inquiryEmailSubject: '',
    autoReplySubject: '',
    autoReplyBody: '',
    goodToKnow: [],
};

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [ContactFormComponent, RouterModule, CommonModule],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit, OnDestroy {
    contact: CmsContact = EMPTY_CONTACT;

    private destroy$ = new Subject<void>();

    constructor(private cms: CmsService) {}

    ngOnInit(): void {
        this.cms.getContact().pipe(takeUntil(this.destroy$)).subscribe((data) => {
            this.contact = data;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
