// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./components/leading/leading').then(m => m.Leading) },
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
      },
      {
        path: 'chatbots/:id',
        loadComponent: () => import('./components/chat/chat').then(m => m.Chat)
      },
      {
        path: 'chatbotcreate',
        loadComponent: () => import('./components/chatbot-create/chatbot-create').then(m => m.ChatbotCreateComponent)
      }
    ]
  },
  { path: '**', loadComponent: () => import('./components/no-page/no-page').then(m => m.NoPage) }
];
