import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeciesService } from "../../../../core/services/species.service";
import { NgIf, NgForOf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import Swal from "sweetalert2";
import ErrorHandler from "../../../../helpers/errorHandler";

@Component({
  selector: 'app-species-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './species-create.component.html',
  styleUrl: './species-create.component.css'
})
export class SpeciesCreateComponent {
  @Output() initializePage = new EventEmitter<void>();
  speciesForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};

  private router: Router;

  constructor(private fb: FormBuilder, private speciesService: SpeciesService, router: Router) {
    this.router = router;
    this.speciesForm = this.fb.group({
      name: ['', Validators.required],
      category: ['SEA', Validators.required],
      minimumWeight: [0, [Validators.required, Validators.min(0)]],
      difficulty: ['COMMON', Validators.required],
      points: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.speciesForm.valid) {
      const formValue = this.speciesForm.value;

      this.speciesService.create(formValue).subscribe({
        next: () => {
          // Handle success
          this.serverErrors = {};
          this.initializePage.emit();
          this.speciesForm.reset();
          this.router.navigate(['/dashboard/species']).then(
            () => Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Species created',
              text: 'The species has been created successfully',
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
