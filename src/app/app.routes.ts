// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login as LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { NoPage } from './components/no-page/no-page';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: Register},

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },// 👈 Protect this route
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // default redirect
  
  { path: '**', component:NoPage }  // wildcard redirect
];
