// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.Register)
  },
{
    path: 'chat/:id',
    loadComponent: () => import('./components/chat/chat').then(m => m.Chat)
  },
  {
        path: 'chatbots/create',
        loadComponent: () => import('./components/chatbot-create/chatbot-create').then(m => m.ChatbotCreateComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' }, // default
      {
        path: 'overview',
        loadComponent: () => import('./components/overview/overview').then(m => m.Overview)
      },
      {
        path: 'chatbots',
        loadComponent: () => import('./components/chatbots/chatbots').then(m => m.Chatbots)
      },
      
      {
        path: 'users',
        loadComponent: () => import('./components/users/users').then(m => m.UsersComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'users/adduser',
        loadComponent: () => import('./components/add-user/add-user').then(m => m.AddUser)
        // note: adjust export name if your AddUser component export differs
      },
      {
    path: 'chatbots/:id',
    loadComponent: () => import('./components/chat/chat').then(m => m.Chat)
  },
  {
    path: 'chatbotcreate',
    loadComponent: () => import('./components/chatbot-create/chatbot-create').then(m => m.ChatbotCreateComponent)
  },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./components/no-page/no-page').then(m => m.NoPage) }
];
