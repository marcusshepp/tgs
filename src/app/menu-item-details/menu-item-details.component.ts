import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MENU_ITEMS, MenuItem } from "../data/menu.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-menu-item-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./menu-item-details.component.html",
  styleUrl: "./menu-item-details.component.scss",
})
export class MenuItemDetailsComponent implements OnInit {
  public menu: MenuItem[] = MENU_ITEMS;
  public menuItemId!: string;
  public menuItem!: MenuItem | undefined;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.menuItemId = params["id"];

      this.menuItem = this.menu.find(
        (item: MenuItem): boolean => item.id === this.menuItemId,
      );
    });
  }
}
