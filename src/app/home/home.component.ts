import { Component } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";
import { HeaderComponent } from "../header/header.component";
import { PopularFoodItemsComponent } from "../popular-food-items/popular-food-items.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HeroComponent, HeaderComponent, PopularFoodItemsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
