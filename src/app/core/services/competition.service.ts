import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {httpService} from "./http.service";
import Competition from "../../types/Competition";

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
export class CompetitionService extends httpService<Competition> {

  protected endpoint = 'competitions';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  getByCode(code: string) {
    return this.http.get<Competition>(`${this.baseURL}/competitions/${code}`);
  }
}
