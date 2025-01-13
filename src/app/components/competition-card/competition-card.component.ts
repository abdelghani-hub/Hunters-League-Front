import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import Competition from "../../types/Competition";
import {RouterLink} from "@angular/router";
import {CompetitionService} from "../../core/services/competition.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-competition-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './competition-card.component.html',
  styleUrl: './competition-card.component.css'
})
export class CompetitionCardComponent {
  @Input() competition!: Competition;
  private competitionService: CompetitionService;
  constructor(competitionService: CompetitionService) {
    this.competitionService = competitionService;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  participate() {
    this.competitionService.participate(this.competition.code)
      .subscribe({
        next: () => {
          Swal.fire(
            {
              toast: true,
              icon: 'success',
              title: 'Competition created',
              text: 'You have successfully registered for the competition',
              showConfirmButton: false,
              timer: 2500,
              position: 'top-end'
            }
          )
        },
        error: ({error}: { error: any }) => {
          Swal.fire(
            {
              toast: true,
              icon: 'error',
              title: 'Error',
              text: error.error,
              showConfirmButton: false,
              timer: 3000,
              position: 'top-end'
            }
          )
        }
      });
  }


  // Helper
  isCompetitionInvalid(): boolean {
    // Check if registration is not open
    if (!this.competition.openRegistration) {
      return true;
    }

    const now = new Date();
    const competitionDateTime = new Date(this.competition.date);

    // Check if date is in the past
    if (competitionDateTime < now) {
      return true;
    }

    // Check if less than 24 hours until competition
    const hoursDifference = (competitionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDifference < 24;
  }

}
