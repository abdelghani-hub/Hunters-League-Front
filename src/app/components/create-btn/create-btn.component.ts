import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-create-btn',
  standalone: true,
    imports: [],
  templateUrl: './create-btn.component.html',
  styleUrl: './create-btn.component.css'
})
export class CreateBtnComponent {
  @Input() entity: string = '';
  constructor() {
  }
}
