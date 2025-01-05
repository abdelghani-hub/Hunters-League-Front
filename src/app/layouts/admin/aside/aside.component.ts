import { Component } from '@angular/core';
import {LogoComponent} from "../../../components/logo/logo.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

}
