import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLOUDINARY_URL } from '../data/cloudinary.model';
import { BannerComponent } from '../banner/banner.component';
import { PageTitleComponent } from '../page-title/page-title.component';

@Component({
    selector: 'app-meet-us',
    standalone: true,
    imports: [PageTitleComponent, CommonModule, BannerComponent],
    templateUrl: './meet-us.component.html',
    styleUrl: './meet-us.component.scss',
})
export class MeetUsComponent {
    public cloudinaryUrl = CLOUDINARY_URL;
}
