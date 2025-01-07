import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {httpService} from "./http.service";
import Competition from "../../types/Competition";

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
