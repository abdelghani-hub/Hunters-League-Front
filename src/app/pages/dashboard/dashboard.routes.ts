import {Routes} from "@angular/router";
import { MainComponent } from "./main/main.component";
import {roleGuard} from "../../core/guards/role.guard";
import {StatisticsComponent} from "./statistics/statistics.component";
import {MembersComponent} from "./members/members.component";
import {CompetitionsComponent} from "./competitions/competitions.component";
import {SpeciesComponent} from "./species/species.component";
import {CompetitionCreateComponent} from "./competitions/competition-create/competition-create.component";
import {SpeciesCreateComponent} from "./species/species-create/species-create.component";
import {CompetitionUpdateComponent} from "./competitions/competition-update/competition-update.component";
import {SpeciesUpdateComponent} from "./species/species-update/species-update.component";
import {MemberUpdateComponent} from "./members/member-update/member-update.component";

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
      {
        path: 'members/edit/:username',
        component: MemberUpdateComponent,
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
        path: 'competitions/edit/:code',
        component: CompetitionUpdateComponent,
      },

      // Species routes
      {
        path: 'species',
        component: SpeciesComponent,
      },
      {
        path: 'species/create',
        component: SpeciesCreateComponent,
      },
      {
        path: 'species/edit/:name',
        component: SpeciesUpdateComponent,
      }
    ]
  }
]
