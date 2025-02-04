import { Component, Input } from '@angular/core';
import { MenuItem } from '../../data/menu.model';
import { Testimonial, TESTIMONIALS } from '../../data/testimonials.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    @Input() menuItem?: MenuItem;
    testimonials: Testimonial[] = TESTIMONIALS;
    currentIndex = 0;

    public nextSlide(): void {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    }

    public previousSlide(): void {
        this.currentIndex =
            (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }
}
