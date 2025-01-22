import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from './core/interceptors/jwt.interceptor';
import {errorInterceptor} from "./core/interceptors/error.interceptor";
import {provideStore} from "@ngrx/store";
import {speciesReducer} from "./core/store/species/species.reducer";
import {provideEffects} from "@ngrx/effects";
import {SpeciesEffects} from "./core/store/species/species.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor])
    ),
    provideStore({SpeciesState: speciesReducer}),
    provideEffects([SpeciesEffects]),
  ]
};
