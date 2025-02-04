import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private readonly profilApiUrl = 'https://api.escuelajs.co/api/v1/auth/profile';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private isAdminSubject = new BehaviorSubject<boolean>(this.hasAdminRole());

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  login(email: string, password: string): Observable<UserResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        console.log("Token reçu:", response.access_token);
        localStorage.setItem('token', response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
      switchMap(() => this.getUserProfile()), // Récupère l'utilisateur après connexion
      tap(user => {
        console.log("Utilisateur récupéré:", user);
  
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('userRole', user.role);
        this.restoreAdminStatus();
        // 🔥 Redirection correcte selon le rôle
        if (user.role === 'admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/products']);
        }
      })
    );
  }
  
  getUserProfile(): Observable<UserResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Aucun token trouvé");
      return new Observable<UserResponse>();
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<UserResponse>(this.profilApiUrl, { headers }); // Remplace 1 par l'ID récupéré dynamiquement
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Inscription utilisateur
  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // Sauvegarde du token après connexion
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  hasAdminRole(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }

  
  restoreAdminStatus() {
    const role = localStorage.getItem('userRole');
    const isAdmin = role === 'admin';
    console.log("Restaurer Admin:", isAdmin); // 🔥 Vérifie bien la valeur dans la console
    this.isAdminSubject.next(isAdmin);
  }
}


