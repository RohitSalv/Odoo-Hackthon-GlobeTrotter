import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  tokenType: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth_token';
  private userIdKey = 'userid';

  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserIdFromStorage();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  private loadUserIdFromStorage() {
    if (!this.isBrowser()) {
      this.userIdSubject.next(null);
      return;
    }

    const storedUserId = localStorage.getItem(this.userIdKey);
    this.userIdSubject.next(storedUserId ? +storedUserId : null);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response?.token && response.userId) {
            if (this.isBrowser()) {
              localStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem(this.userIdKey, response.userId.toString());
            }
            this.userIdSubject.next(response.userId);
          }
        })
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userIdKey);
    }
    this.userIdSubject.next(null);
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  sendOtp(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, payload);
  }

  verifyOtp(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, payload);
  }

  setPassword(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/set-password`, payload);
  }

  register(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }
}
