import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from './core/interceptors/jwt.interceptor';
import {errorInterceptor} from "./core/interceptors/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor])
    )]
};
