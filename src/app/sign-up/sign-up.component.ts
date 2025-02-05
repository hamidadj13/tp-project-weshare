import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      avatar: ['', Validators.required],
      role: ['customer', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const newUser = this.signUpForm.value;
      this.authService.signUp(newUser).subscribe({
        next: () => {
          this.notificationService.success('Inscription réussie ! Redirection...');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('⛔ Erreur lors de l\'inscription:', err);

          if (err.status === 400) {
            this.notificationService.error('Erreur 400: Données invalides');
          } else if (err.status === 500) {
            this.notificationService.error('Erreur 500: Problème serveur');
          } else {
            this.notificationService.error('Une erreur est survenue');
          }
        }
      });
    } else {
      this.notificationService.warning('Veuillez remplir tous les champs correctement');
    }
  }
}
