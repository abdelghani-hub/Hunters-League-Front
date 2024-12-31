import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {PageRequest} from "../models/pagination.types";
import {Competition} from "../../components/competition-card/competition-card.component";

interface Pageable {
  page: number;
  size: number;
  sort: string;
}

interface PageableResponse<T> {
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
export class CompetitionService {
  private http: HttpClient;
  private router: Router;
  private baseURL: string = 'http://localhost:8443/api/v1';


  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  getPageCompetition(pageable: PageRequest) {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size)
      .set('sort', pageable.sort || 'date,desc');
    return this.http
      .get<PageableResponse<Competition>>(`${this.baseURL}/competitions/all`, {params})
      .pipe(
        map(res => res?.content ?? []),
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(['/auth/login'])
              .then(() => console.log('Access denied, please login to access this page'));
          }
          return throwError(() => error);
        })
      );
  }
}
