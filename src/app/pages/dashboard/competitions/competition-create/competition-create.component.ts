import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompetitionService} from "../../../../core/services/competition.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import ErrorHandler from "../../../../helpers/errorHandler";


@Component({
  selector: 'app-competition-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './competition-create.component.html',
  styleUrl: './competition-create.component.css'
})
export class CompetitionCreateComponent {
  @Output() initializePage = new EventEmitter<void>();
  competitionForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};

  private router: Router;

  constructor(private fb: FormBuilder, private competitionService: CompetitionService, router: Router) {
    this.router = router;
    this.competitionForm = this.fb.group({
      location: ['', Validators.required],
      date: ['', Validators.required],
      speciesType: ['SEA', Validators.required],
      minParticipants: [1, [Validators.required, Validators.min(1)]],
      maxParticipants: [1, [Validators.required, Validators.min(1)]],
      openRegistration: [true],
      code: [''],
    });
    this.setupCodeUpdate();
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

  onSubmit() {
    if (this.competitionForm.valid) {
      const formValue = this.competitionForm.value;

      const competition = {
        ...formValue,
        date: new Date(formValue.date).toISOString()
      };

      this.competitionService.create(competition).subscribe({
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
                title: 'Competition created',
                text: 'The competition has been created successfully',
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
