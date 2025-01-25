import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";
import { RouterModule } from "@angular/router";
import { PreloaderComponent } from "../preloader/preloader.component";
import { OffcanvasComponent } from "../offcanvas/offcanvas.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, PreloaderComponent, OffcanvasComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
}
