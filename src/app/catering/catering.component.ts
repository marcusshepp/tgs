import { Component } from "@angular/core";
import { ContactUsComponent } from "../contact/contact-us/contact-us.component";

@Component({
    selector: "app-catering",
    imports: [ContactUsComponent],
    templateUrl: "./catering.component.html",
    styleUrl: "./catering.component.scss"
})
export class CateringComponent {}
