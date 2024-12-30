import {Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [authGuard]
  },
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'}
];
