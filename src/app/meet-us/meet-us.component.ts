import { Component } from '@angular/core';
import { CLOUDINARY_URL } from '../data/cloudinary.model';

@Component({
    selector: 'app-meet-us',
    standalone: true,
    imports: [],
    templateUrl: './meet-us.component.html',
    styleUrl: './meet-us.component.scss',
})
export class MeetUsComponent {
    public cloudinaryUrl = CLOUDINARY_URL;
}
