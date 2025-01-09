import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FooterComponent} from "../../../components/footer/footer.component";
import {HeaderComponent} from "../../../components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {AsideComponent} from "../../../layouts/admin/aside/aside.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, RouterOutlet, AsideComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
