import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-offcanvas",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./offcanvas.component.html",
  styleUrl: "./offcanvas.component.scss",
})
export class OffcanvasComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
}
