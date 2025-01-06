import {Injectable} from '@angular/core';
import {httpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import Species from "../../types/Species";

@Injectable({
  providedIn: 'root'
})
export class SpeciesService extends httpService<Species> {

  protected endpoint = 'species';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }
}
