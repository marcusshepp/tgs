import { Component } from '@angular/core';
import { StarComponent } from './stars.component';

@Component({
    selector: 'app-feedback-form',
    standalone: true,
    imports: [StarComponent],
    templateUrl: './feedback-form.component.html',
    styleUrl: './feedback-form.component.scss',
})
export class FeedbackFormComponent {
    public onRatingChange(rating: number): void {
        console.log(`New rating for ${rating}`);
    }
}
