import { Component } from "@angular/core";
import { MENU_ITEMS } from "../data/menu.model";

@Component({
  selector: "app-full-menu",
  standalone: true,
  imports: [],
  templateUrl: "./full-menu.component.html",
  styleUrl: "./full-menu.component.scss",
})
export class FullMenuComponent {
  public menu = MENU_ITEMS;
}
