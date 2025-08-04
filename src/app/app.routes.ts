// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login as LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { NoPage } from './components/no-page/no-page';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { UsersComponent } from './components/users/users'; // Assuming you have a Users component


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: Register},

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },// 👈 Protect this route
  
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // default redirect
  
  { path: '**', component:NoPage }  // wildcard redirect
];
