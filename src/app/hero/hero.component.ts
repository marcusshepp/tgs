import { Component } from "@angular/core";
import { CONTACT } from "../data/contact-info.model";
import { SOCIAL_MEDIA } from "../data/social-media.model";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent {
  public contact = CONTACT;
  public socials = SOCIAL_MEDIA;
}
