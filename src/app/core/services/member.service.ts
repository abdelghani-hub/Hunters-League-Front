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

  findByUsername(username: string) {
    return this.http.get<Member>(`${this.baseURL}/users/${username}`);
  }

  updateByUsername(username: string, member: Member) {
    return this.http.put<Member>(`${this.baseURL}/users/update/${username}`, member);
  }
}
