import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LogoComponent} from "../logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    LogoComponent,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private authService: AuthService;
  private router: Router;
  role: string | null;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.role = authService.getCurrentRole();
  }

  logout() {
    this.authService.logout();
  }
}
