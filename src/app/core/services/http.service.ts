import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PageRequest } from '../models/pagination.types';

export interface Pageable {
  page: number;
  size: number;
  sort: string;
}

export interface PageableResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export abstract class httpService<T> {
  protected baseURL = 'http://localhost:8443/api/v1';
  protected http: HttpClient;
  protected router: Router;
  protected abstract endpoint: string;

  protected constructor(
    http: HttpClient, router: Router
  ) {
    this.http = http;
    this.router = router;
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${this.endpoint}`, item)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  update(id: number | string, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${this.endpoint}/${id}`, item)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getPage(pageable: PageRequest): Observable<PageableResponse<T>> {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size)
      .set('sort', pageable.sort || 'date,desc');

    return this.http
      .get<PageableResponse<T>>(`${this.baseURL}/${this.endpoint}/all`, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  protected handleError(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/auth/login'])
        .then(() => console.log('Access denied, please login to access this page'));
    }
    return throwError(() => error);
  }
}
