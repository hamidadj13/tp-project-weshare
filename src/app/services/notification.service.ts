import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(`✅ ${message}`, 'Fermer', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  error(message: string) {
    this.snackBar.open(`❌ ${message}`, 'Fermer', { duration: 4000, panelClass: ['error-snackbar'] });
  }

  warning(message: string) {
    this.snackBar.open(`⚠️ ${message}`, 'Fermer', { duration: 4000, panelClass: ['warning-snackbar'] });
  }
}
