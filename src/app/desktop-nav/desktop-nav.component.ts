import { Component } from '@angular/core';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-desktop-nav',
  standalone: true,
  imports: [],
  templateUrl: './desktop-nav.component.html',
  styleUrl: './desktop-nav.component.scss'
})
export class DesktopNavComponent {
    constructor(private cms: CmsService) {}
}
