// chatyourdocs/src/app/guards/admin-guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const decoded = auth.getDecodedToken();
  const roles: string[] = decoded?.scope?.split(' ') || [];

  if (roles.includes('ADMIN')) {
    return true;
  }

  // Not an admin → redirect
  router.navigate(['/dashboard']);
  return false;
};
