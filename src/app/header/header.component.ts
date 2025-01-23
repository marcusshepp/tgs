import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
}
