import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
}
