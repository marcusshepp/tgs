import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { CateringComponent } from "./catering/catering.component";
import { FullMenuComponent } from "./full-menu/full-menu.component";
import { ContactUsComponent } from "./contact/contact-us/contact-us.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "reviews", component: ReviewsComponent },
  { path: "catering", component: CateringComponent },
  { path: "menu", component: FullMenuComponent },
  { path: "contact-us", component: ContactUsComponent },
];
