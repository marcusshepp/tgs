import { Component } from "@angular/core";
import { MENU_ITEMS, MenuItem } from "../data/menu.model";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-full-menu",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./full-menu.component.html",
  styleUrl: "./full-menu.component.scss",
})
export class FullMenuComponent {
  public menu: MenuItem[] = MENU_ITEMS;

  constructor(private router: Router) {}

  public goToMenuItem(id: string): void {
    this.router.navigate(["menu-item", id]);
  }
}
