import { Component } from "@angular/core";
import { SOCIAL_MEDIA } from "../data/social-media.model";
import { CONTACT } from "../data/contact-info.model";
import { RouterModule } from "@angular/router";
import { PreloaderComponent } from "../preloader/preloader.component";
import { OffcanvasComponent } from "../offcanvas/offcanvas.component";
import { MobileService } from "../services/mobile.service";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, PreloaderComponent, OffcanvasComponent, CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  public socials = SOCIAL_MEDIA;
  public contact = CONTACT;
  public isHandset$: Observable<boolean>;
  public mobileNavOpen: boolean = false;

  constructor(private mobileService: MobileService) {
    this.isHandset$ = this.mobileService.isHandset();
  }

  public toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
    this.mobileService.isMobileNavOpen.next(this.mobileNavOpen);
  }
}
