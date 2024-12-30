import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser: Observable<AuthResponse | null>;
  private apiUrl: string = 'http://localhost:8443/api/v1';
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      window.localStorage.getItem('currentUser')
        ? JSON.parse(window.localStorage.getItem('currentUser')!)
        : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.http = http;
    this.router = router;
  }

  login(login: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, {login, password})
      .pipe(
        map( res => {
          window.localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          return res;
        }),
        catchError(error => {
            let errorMessage = 'An unexpected error occurred.';
            if (error.status === 403) {
                errorMessage = 'Invalid credentials.';
            }
            return throwError(() => new Error(errorMessage));
        })
      );
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  logout() {
    window.localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
