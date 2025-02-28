import { Component } from '@angular/core';

@Component({
    selector: 'app-meet-us',
    standalone: true,
    templateUrl: './meet-us.component.html',
    styleUrl: './meet-us.component.scss',
})
export class MeetUsComponent {
    public onRatingChange(rating: number): void {
        console.log(`New rating for ${rating}`);
    }
}
