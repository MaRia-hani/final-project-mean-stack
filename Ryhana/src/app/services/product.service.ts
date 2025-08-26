import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl ='http://localhost:3000/';
  private allProductsUrl = this.baseUrl+'products/allproducts';
  private productUrl = this.baseUrl+'products/product';
  private categoriesUrl = this.baseUrl+'products/categories';
  private addProductUrl = this.baseUrl+'products/addproduct';
  private removeProductUrl = this.baseUrl+'products/removeproduct';
  private addToCartUrl = this.baseUrl+'cart/addtocart';
  private userCountUrl = this.baseUrl+'user/count';
  private productsCountUrl = this.baseUrl+'products/count';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.allProductsUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.productUrl}/${id}`);
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.categoriesUrl}/${category}`);
  }

  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post<any>(`${this.addProductUrl}`, formData, { headers });
  }

  removeProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.delete<any>(`${this.removeProductUrl}/${id}`, { headers });
  }

  addtocart(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.addToCartUrl}`, payload, {
      headers,
    });
  }

  getTotalUsers(): Observable<any> {
    return this.http.get<any>(this.userCountUrl);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any>(this.productsCountUrl);
  }
}
