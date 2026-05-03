import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { HomeMenuComponent } from '../home-menu/home-menu.component';
import { TrustedByComponent } from '../trusted-by/trusted-by.component';
import { ServicesComponent } from '../services/services.component';
import { ContactFormComponent } from '../contact/contact-form/contact-form.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, HomeMenuComponent, TrustedByComponent, ServicesComponent, ContactFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
