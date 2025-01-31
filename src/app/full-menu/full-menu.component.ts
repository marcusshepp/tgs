import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS, MenuItem } from "../data/menu.model";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-full-menu",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./full-menu.component.html",
  styleUrl: "./full-menu.component.scss",
})
export class FullMenuComponent implements OnInit {
  public menu: MenuItem[] = MENU_ITEMS;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title,
  ) {}

  public ngOnInit(): void {
    this.title.setTitle("Our Menu | Food Truck Name");
    this.meta.updateTag({
      name: "description",
      content: "Explore our delicious menu of freshly prepared street food.",
    });
  }

  public goToMenuItem(id: string): void {
    this.router.navigate(["menu-item", id]);
  }

  public getTimeUnit(unit: string): string {
    // TODO
    return "00";
  }
}
