import { Component } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";
import { PopularFoodItemsComponent } from "../popular-food-items/popular-food-items.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HeroComponent, PopularFoodItemsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
