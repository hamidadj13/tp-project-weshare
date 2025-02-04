import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }

      // Vérifier si la route est réservée aux admins
      const requiresAdmin = route.data?.['requiresAdmin'] || false;
      const isAdmin = authService.hasAdminRole(); // Vérifier directement localStorage

      if (requiresAdmin && !isAdmin) {
        router.navigate(['/products']); // 🔥 Empêcher les non-admins d’accéder à /users
        return false;
      }

      return true;
    })
  );
};
