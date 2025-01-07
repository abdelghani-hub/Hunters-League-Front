import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (response, next) => {

  return next(response).pipe(
    catchError((err) => {
      if(err.status === 401 || err.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unauthorized : '+ err.message,
        }).then(() =>
        console.log('Unauthorized : ' + err)
        );
      }
      if(err.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Not Found : '+ err.message,
        }).then(() =>
        console.log('Not Found : ' + err)
        );
      }
      if(err.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Internal Server Error : '+ err.message,
        }).then(() =>
        console.log('Internal Server Error : ' + err)
        );
      }
      if(err.status === 400) {
        console.log('Bad response : ' + err.message);
      }

      const error = err.message || err.statusText;
      console.error(error);
      return throwError(()=>err);
    }));
};
