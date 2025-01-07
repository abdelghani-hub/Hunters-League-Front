import {Routes} from "@angular/router";
import { MainComponent } from "./main/main.component";
import {HomeComponent} from "../home/home.component";
import {roleGuard} from "../../core/guards/role.guard";
import {StatisticsComponent} from "./statistics/statistics.component";
import {MembersComponent} from "./members/members.component";
import {CompetitionsComponent} from "./competitions/competitions.component";
import {SpeciesComponent} from "./species/species.component";
import {CompetitionCreateComponent} from "./competitions/competition-create/competition-create.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['ADMIN']
    },
    children: [
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },

      // Members routes
      {
        path: 'members',
        component: MembersComponent,
      },

      // Competitions routes
      {
        path: 'competitions',
        component: CompetitionsComponent,
      },
      {
        path: 'competitions/create',
        component: CompetitionCreateComponent,
      },
      {
        path: 'competitions/:code',
        component: CompetitionCreateComponent,
      },

      // Species routes
      {
        path: 'species',
        component: SpeciesComponent,
      }
    ]
  }
]
