import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MENU_ITEMS, MenuItem } from "../data/menu.model";

@Component({
  selector: "app-popular-food-items",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./popular-food-items.component.html",
  styleUrl: "./popular-food-items.component.scss",
})
export class PopularFoodItemsComponent {
  public menu: MenuItem[] = MENU_ITEMS;

  public selectedDish: MenuItem | null = null;

  public openModal(dish: MenuItem): void {
    this.selectedDish = dish;
  }

  public get displayedDishes(): MenuItem[] {
    return this.menu.slice(0, 4);
  }
}
