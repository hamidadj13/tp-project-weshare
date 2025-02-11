import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Récupère la liste des catégories depuis l'API
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
