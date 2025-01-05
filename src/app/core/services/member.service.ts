import { Injectable } from '@angular/core';
import Member from "../../types/Member";
import {httpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MemberService extends httpService<Member> {

  protected endpoint = 'users';

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }
}
