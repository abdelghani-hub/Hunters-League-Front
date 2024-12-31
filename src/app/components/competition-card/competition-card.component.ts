import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";

export interface Competition {
  code: string;
  date: string;
  location: string;
  maxParticipants: number;
  minParticipants: number;
  openRegistration: boolean;
  speciesType: string;
}


@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent {
  @Input() competition!: Competition;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
