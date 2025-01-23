import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ReviewsComponent } from "./reviews/reviews.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "reviews", component: ReviewsComponent },
];
