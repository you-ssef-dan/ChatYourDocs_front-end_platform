// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth }      from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1️ Pas de token sur login/register
    if (req.url.endsWith('/login') || req.url.endsWith('/register')) {
      return next.handle(req);
    }

    // 2️ Sinon, ajoute le token s’il existe
    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
