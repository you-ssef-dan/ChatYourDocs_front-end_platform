// File: src/app/services/auth.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

// DTO for user list response
export interface UserDto {
  id: number;
  username: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly apiUrl = 'http://localhost:8085/auth';
  private token: string | null = null;
  private isBrowser = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password });
  }

  register(payload: { username: string; password: string, role: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  addUser(payload: { username: string; password: string; role: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/addUser`, payload);
}

  setToken(token: string): void {
    this.token = token;
    if (this.isBrowser) {
      localStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    if (this.token) {
      return this.token;
    }
    if (this.isBrowser) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  logout(): void {
    this.token = null;
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    const valid = decoded.exp && decoded.exp > now;
    if (!valid) this.logout();
    return valid;
  } catch (e) {
    this.logout();
    return false;
  }
}


  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }

  /** Fetch all users (ADMIN only) */
  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }
}
