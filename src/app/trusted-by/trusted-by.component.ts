import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trusted-by',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './trusted-by.component.html',
    styleUrls: ['./trusted-by.component.scss'],
})
export class TrustedByComponent {
    clients: string[] = [
        'Ford Motor Company',
        'General Motors',
        'Chrysler',
        'Frito-Lay',
        'Republic Services',
        'Cleary University',
        'University of Michigan',
        'Community Choice Credit Union',
    ];
}
