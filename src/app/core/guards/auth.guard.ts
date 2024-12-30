import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const currentUser = authService.currentUserValue;
  if (currentUser) {
    return true;
  }

  router.navigate(
    ['/auth/login']
  ).then(r => authService.logout());
  return false;
};
