import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('⛔ Erreur détectée:', error);

      let errorMessage = 'Une erreur est survenue';

      if (error.status === 400) {
        errorMessage = extractErrorMessage(error);
        notificationService.error(`❌ Erreur 400: ${errorMessage}`);
      } else if (error.status === 401) {
        errorMessage = 'Non autorisé: Veuillez vous reconnecter.';
        notificationService.warning(errorMessage);
      } else if (error.status === 500) {
        errorMessage = 'Erreur serveur: Essayez plus tard.';
        notificationService.error(errorMessage);
      } else {
        notificationService.error(errorMessage);
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};

// 🔹 Fonction pour extraire les erreurs API détaillées
function extractErrorMessage(error: HttpErrorResponse): string {
  if (error.error?.message) {
    return Array.isArray(error.error.message) ? error.error.message.join(', ') : error.error.message;
  }
  return 'Requête invalide';
}
