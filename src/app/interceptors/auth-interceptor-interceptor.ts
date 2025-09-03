// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('🔍 Interceptor called for:', req.url);
    
    // Skip auth for login/register
    if (req.url.endsWith('/login') || req.url.endsWith('/register')) {
      console.log('⏭️ Skipping auth for login/register');
      return next.handle(req);
    }

    // Get token
    const token = this.auth.getToken();
    console.log('🔑 Token found:', token ? 'YES' : 'NO');
    console.log('🔑 Token value:', token ? `${token.substring(0, 20)}...` : 'null');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('✅ Authorization header added to request');
      console.log('📋 Final headers:', cloned.headers.get('Authorization') ? 'Present' : 'Missing');
      return next.handle(cloned);
    } else {
      console.log('❌ No token available - request sent without auth');
    }
    
    return next.handle(req);
  }
}