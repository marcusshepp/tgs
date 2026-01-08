import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-menu-pdf',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf.component.html',
    styleUrl: './menu-pdf.component.scss',
})
export class MenuPdfComponent {}
