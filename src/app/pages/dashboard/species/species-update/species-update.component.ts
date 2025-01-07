import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeciesService } from "../../../../core/services/species.service";
import { NgIf, NgForOf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import Swal from "sweetalert2";
import ErrorHandler from "../../../../helpers/errorHandler";
import Species from "../../../../types/Species";

@Component({
  selector: 'app-species-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './species-update.component.html',
  styleUrl: './species-update.component.css'
})
export class SpeciesUpdateComponent {
  @Output() initializePage = new EventEmitter<void>();
  speciesForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};
  editedSpecies: Species | null;

  private router: Router;
  fb: FormBuilder;
  private speciesService: SpeciesService;

  constructor(fb: FormBuilder, speciesService: SpeciesService, router: Router) {
    this.router = router;
    this.fb = fb;
    this.speciesForm = this.fb.group({
      name: ['', Validators.required],
      category: ['SEA', Validators.required],
      minimumWeight: [0, [Validators.required, Validators.min(0)]],
      difficulty: ['COMMON', Validators.required],
      points: [0, [Validators.required, Validators.min(0)]]
    });
    this.speciesService = speciesService;
    this.editedSpecies = null;
    this.getEditedSpecies();
  }

  getEditedSpecies(): void {
    const name = decodeURIComponent(this.router.url.split('/').pop() || '');

    this.speciesService.getByName(name).subscribe({
      next: (species) => {
        this.editedSpecies = species;
        this.speciesForm.patchValue(species);
      },
      error: (error) => {
        console.error('Error fetching species:', error);
      }
    });
  }

  onSubmit() {
    if (this.speciesForm.valid) {
      const formValue = this.speciesForm.value;

      const species = {
        ...formValue,
        id: this.editedSpecies?.id
      }

      this.speciesService.update(species).subscribe({
        next: () => {
          // Handle success
          this.serverErrors = {};
          this.initializePage.emit();
          this.speciesForm.reset();
          this.router.navigate(['/dashboard/species']).then(
            () => Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Species updated',
              text: 'The species has been updated successfully',
              showConfirmButton: false,
              timer: 2500,
              position: 'top-end'
            })
          );
        },
        error: (error) => {
          console.error('Error creating species:', error);
          if (error && error.error) {
            this.serverErrors = ErrorHandler.handleServerErrors(error.error);
          }
        }
      });
    }
  }
}
