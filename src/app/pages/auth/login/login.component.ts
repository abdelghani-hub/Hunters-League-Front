import {Component, inject, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = inject(FormBuilder).group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  // Getters for form controls
  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    if(this.loginForm.valid){
      const {login, password} = this.loginForm.value;
      this.authService.login(login!, password!)
        .subscribe({
          next: (res  ) => {
            let route: string = this.authService.getRoleRoute(res);
            this.router.navigate([route])
              .then(r => {
                return r;
              });
          },
          error: error => {
            this.errorMessage = error.message;
          }
        })
    }
  }
}
