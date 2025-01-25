import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";

@Component({
  selector: "app-offcanvas",
  standalone: true,
  imports: [],
  templateUrl: "./offcanvas.component.html",
  styleUrl: "./offcanvas.component.scss",
})
export class OffcanvasComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
}
