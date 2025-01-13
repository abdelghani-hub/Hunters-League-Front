import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

interface AuthResponse {
  token: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  cin: string;
  nationality: string;
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

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        map(res => {
          window.localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          return res;
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => error)
        })
      );
  }


  login(login: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, {login, password})
      .pipe(
        map(res => {
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
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload();
    });
    this.currentUserSubject.next(null);
  }


  getRoleRoute(res: AuthResponse) {
    // redirect depending on role
    let decodedJWT = jwtDecode<CustomJwtPayload>(res.token);
    switch (decodedJWT.role) {
      case 'ADMIN':
        return '/dashboard';
      case 'JURY':
        return '/jury';
      case 'MEMBER':
        return '/home';
      default:
        return '/login';
    }
  }

  getCurrentRole(): string | null {
    if (!this.currentUserValue) {
      return null;
    }
    let decodedJWT = jwtDecode<CustomJwtPayload>(this.currentUserValue?.token!);
    if (decodedJWT.exp && decodedJWT.exp < Date.now() / 1000) {
      this.logout();
      return null;
    }
    return decodedJWT.role ?? null;
  }
}
