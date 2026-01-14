import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_SECTIONS, MenuSection, GOOD_TO_KNOW_ITEMS, CONTACT_INFO } from '../../data/catering-menu.model';

@Component({
    selector: 'app-menu-pdf-catering',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu-pdf-catering.component.html',
    styleUrl: './menu-pdf-catering.component.scss',
})
export class MenuPdfCateringComponent implements OnInit {
    menuSections: MenuSection[] = [];
    goodToKnow = GOOD_TO_KNOW_ITEMS;
    contact = CONTACT_INFO;

    ngOnInit() {
        this.menuSections = MENU_SECTIONS;
    }

    printMenu() {
        window.print();
    }
}
