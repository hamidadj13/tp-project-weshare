import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private http = inject(HttpClient);


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByTitle(title: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/?title=${title}`);
  }

  addProduct(productData: any): Observable<any> {
    console.log("on est dans service et le body est : ", productData)
    return this.http.post(`${this.apiUrl}`, productData);
  }
  
  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }
  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }  
  
}
