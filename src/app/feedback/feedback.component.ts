import { Component } from '@angular/core';
import { StarComponent } from './stars.component';

@Component({
    selector: 'app-feedback',
    standalone: true,
    imports: [StarComponent],
    templateUrl: './feedback.component.html',
    styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
    public onRatingChange(rating: number): void {
        console.log(`New rating for ${rating}`);
    }
}
