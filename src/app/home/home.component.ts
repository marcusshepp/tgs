import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PopularFoodItemsComponent } from '../popular-food-items/popular-food-items.component';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, PopularFoodItemsComponent, ContactFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
