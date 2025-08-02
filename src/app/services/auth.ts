// src/app/services/auth.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = 'http://localhost:8081/api/auth'; // 🔁 Replace with your backend API URL
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Send login request
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // 🔐 Send registration request
  register(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // 💾 Store token in localStorage + memory
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  // 🔐 Get token (from memory or storage)
  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  // 🔒 Logout user
  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // ✅ Check if user is logged in
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
