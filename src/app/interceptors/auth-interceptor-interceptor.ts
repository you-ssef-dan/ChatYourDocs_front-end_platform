// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth as AuthService } from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // ✅ Debug logs
    console.log('[AuthInterceptor] Intercepting request to:', req.url);
    console.log('[AuthInterceptor] Token found:', token);

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      console.log('[AuthInterceptor] Request headers:', cloned.headers);

      return next.handle(cloned);
    }

    console.warn('[AuthInterceptor] No token found. Sending request without Authorization header.');
    return next.handle(req);
  }
}
