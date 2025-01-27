import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  rating?: number;
  reviewCount?: number;
}

export const DUMMY_DISHES: Dish[] = [
  {
    id: 1,
    name: "Chicken Fried Rice",
    description: "Delicious chicken fried rice",
    price: 100.99,
    imagePath: "/img/dishes/dishes1_1.png",
    rating: 4.5,
    reviewCount: 25,
  },
  {
    id: 2,
    name: "Chinese Pasta",
    description: "Authentic Chinese pasta dish",
    price: 15.99,
    imagePath: "/img/dishes/dishes1_2.png",
    rating: 4.2,
    reviewCount: 18,
  },
  {
    id: 3,
    name: "Chicken Pizza",
    description: "Classic chicken pizza",
    price: 26.99,
    imagePath: "/img/dishes/dishes1_3.png",
    rating: 4.7,
    reviewCount: 42,
  },
  {
    id: 4,
    name: "Chicken Noodles",
    description: "Spicy chicken noodles",
    price: 39.0,
    imagePath: "/img/dishes/dishes1_4.png",
    rating: 4.3,
    reviewCount: 30,
  },
  {
    id: 5,
    name: "Grilled Chicken",
    description: "Perfectly grilled chicken",
    price: 20.99,
    imagePath: "/img/dishes/dishes1_5.png",
    rating: 4.6,
    reviewCount: 22,
  },
  {
    id: 6,
    name: "Seafood Pasta",
    description: "Creamy seafood pasta",
    price: 35.5,
    imagePath: "/img/dishes/dishes1_6.png",
    rating: 4.4,
    reviewCount: 15,
  },
  {
    id: 7,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetable stir fry",
    price: 18.75,
    imagePath: "/img/dishes/dishes1_7.png",
    rating: 4.1,
    reviewCount: 20,
  },
  {
    id: 8,
    name: "Beef Burger",
    description: "Juicy beef burger",
    price: 22.99,
    imagePath: "/img/dishes/dishes1_8.png",
    rating: 4.8,
    reviewCount: 50,
  },
];

@Component({
  selector: "app-popular-food-items",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./popular-food-items.component.html",
  styleUrl: "./popular-food-items.component.scss",
})
export class PopularFoodItemsComponent {
  public dishes: Dish[] = DUMMY_DISHES;
  public selectedDish: Dish | null = null;

  public openModal(dish: Dish): void {
    this.selectedDish = dish;
  }

  public get displayedDishes(): Dish[] {
    return this.dishes.slice(0, 3);
  }
}
