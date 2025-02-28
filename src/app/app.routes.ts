import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CateringComponent } from './catering/catering.component';
import { FullMenuComponent } from './full-menu/full-menu.component';
import { ContactUsComponent } from './contact/contact-us/contact-us.component';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { MeetUsComponent } from './meet-us/meet-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'catering', component: CateringComponent },
    { path: 'menu', component: FullMenuComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'meet-us', component: MeetUsComponent },
    { path: 'menu-item/:id', component: MenuItemDetailsComponent },
];
