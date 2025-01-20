import { Component } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HeroComponent, HeaderComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
