import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PopularFoodItemsComponent } from '../popular-food-items/popular-food-items.component';
import { TrustedByComponent } from '../trusted-by/trusted-by.component';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, PopularFoodItemsComponent, TrustedByComponent, ContactFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
