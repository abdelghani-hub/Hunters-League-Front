import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {httpService, PageableResponse} from "./http.service";
import Competition from "../../types/Competition";
import {PageRequest} from "../models/pagination.types";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService extends httpService<Competition> {

  protected endpoint = 'competitions';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  getByCode(code: string) {
    return this.http.get<Competition>(`${this.baseURL}/competitions/${code}`);
  }

  getPageByType(type: String, pageable: PageRequest): Observable<PageableResponse<Competition>> {
    const params = new HttpParams()
      .set('page', pageable.page)
      .set('size', pageable.size)
      .set('sort', pageable.sort || 'date,desc');

    return this.http
      .get<PageableResponse<Competition>>(`${this.baseURL}/${this.endpoint}/type/${type}`, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  participate(code: string): Observable<Competition> {
    return this.http.post<Competition>(`${this.baseURL}/participations/create`, {
      competitionCode: code
    });
  }
}
