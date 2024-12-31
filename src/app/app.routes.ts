import {Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {roleGuard} from "./core/guards/role.guard";
import {LandingComponent} from "./layouts/landing/landing.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['ADMIN', 'MEMBER', 'JURY']
        }
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [roleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
];
