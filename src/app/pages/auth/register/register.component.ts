import {Component, inject, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = inject(FormBuilder).group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
    },
    {validators: this.passwordMatchValidator});

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string | null = null;
  loading: boolean = false;

  // On submit
  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          let route: string = this.authService.getRoleRoute(res)
          this.router.navigate([route])
            .then(r => {
              return r;
            });
        },
        error: (error) => {
          this.loading = false;
          if (error.error) {
            // Loop through each field and set errors
            for (const key in error.error) {
              if (error.error && typeof error.error === 'object') {
                // Loop through each key in the error response
                Object.keys(error.error).forEach((field) => {
                  // Check if the form has a control with this name
                  const control = this.registerForm.get(field);
                  if (control) {
                    // Set the error message from the response
                    control.setErrors({ serverError: error.error[field].join(', ') });
                  }
                });
              }
            }
          }
        }
      });
    }
  }

  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  // Getters for form controls
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get cin() {
    return this.registerForm.get('cin');
  }

  get nationality() {
    return this.registerForm.get('nationality');
  }
}
