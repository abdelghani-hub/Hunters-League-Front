import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state): true | false => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUserRole = authService.getCurrentRole();

  if (!currentUserRole) {
    console.error('No current user role found.');
    router.navigate(['/auth/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'];
  if (!allowedRoles) {
    console.error('No roles specified in route data.');
    router.navigate(['/auth/login']);
    return false;
  }

  if (!allowedRoles.includes(currentUserRole)) {
    console.warn(`Access denied. Current role: ${currentUserRole}, Allowed roles: ${allowedRoles}`);
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
