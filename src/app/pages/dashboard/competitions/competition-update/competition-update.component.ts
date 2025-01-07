import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from "../../../../core/services/competition.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import ErrorHandler from "../../../../helpers/errorHandler";
import Competition from "../../../../types/Competition";

@Component({
  selector: 'app-competition-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './competition-update.component.html',
  styleUrl: './competition-update.component.css'
})
export class CompetitionUpdateComponent {
  @Output() initializePage = new EventEmitter<void>();
  competitionForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};
  editedCompetition: Competition | null;

  private router: Router;
  fb: FormBuilder;
  private competitionService: CompetitionService

  constructor(fb: FormBuilder, competitionService: CompetitionService, router: Router) {
    this.router = router;
    this.fb = fb;
    this.competitionForm = this.fb.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      speciesType: ['', Validators.required],
      minParticipants: ['', [Validators.required, Validators.min(1)]],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      openRegistration: [false],
      code: [''],
    });
    this.competitionService = competitionService;
    this.editedCompetition = null;
    this.setupCodeUpdate();
    this.getEditedCompetition();
  }

  getEditedCompetition(): void {
    const code = decodeURIComponent(this.router.url.split('/').pop() || '');

    this.competitionService.getByCode(code).subscribe({
      next: (competition) => {
        this.editedCompetition = competition;
        this.competitionForm.patchValue(competition);
      }
    });
  }

  private setupCodeUpdate() {
    this.competitionForm.get('location')?.valueChanges.subscribe(() => this.updateCode());
    this.competitionForm.get('date')?.valueChanges.subscribe(() => this.updateCode());
  }

  private updateCode() {
    const location = this.competitionForm.get('location')?.value;
    const date = this.competitionForm.get('date')?.value;

    if (location && date) {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const code = `${location}-${formattedDate}`;
      this.competitionForm.get('code')?.setValue(code, {emitEvent: false});
    } else {
      this.competitionForm.get('code')?.setValue('');
    }
  }

  onSubmit = () => {
    if (this.competitionForm.valid) {
      const formValue = this.competitionForm.value;

      const competition = {
        ...formValue,
        date: new Date(formValue.date).toISOString(),
        id: this.editedCompetition?.id
      };

      this.competitionService.update(competition).subscribe({
        next: () => {
          // Handle success
          this.serverErrors = {};
          this.initializePage.emit();
          this.competitionForm.reset();
          this.router.navigate(['/dashboard/competitions']).then(
            () => Swal.fire(
              {
                toast: true,
                icon: 'success',
                title: 'Competition updated',
                text: 'The competition has been updated successfully',
                showConfirmButton: false,
                timer: 2500,
                position: 'top-end'
              }
            )
          );
        },
        error: (error) => {
          console.error('Error creating competition:', error);
          if (error && error.error) {
            this.serverErrors = ErrorHandler.handleServerErrors(error.error);
          }
        }
      });
    }
  }
}
