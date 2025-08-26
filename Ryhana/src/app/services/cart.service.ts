import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });

  baseURL = 'http://localhost:3000/cart';
  public userCart = new BehaviorSubject<any>(undefined);
  
  addToCart(cartItem: any) {
    const headers = this.headers
    return this.http.post(this.baseURL+'/addtocart', cartItem, {headers});
  }

  getCartItems(id:string) {
    const headers = this.headers
    return this.http.get<[]>(this.baseURL+`/${id}`,{headers});
  }

  clearCart() {
    return this.http.delete(this.baseURL+'/clearcart');
  }

  removeFromCart(payload:{userId:string,productId:string,size:string, quantity:string}){
    const headers = this.headers;
    return this.http.post(this.baseURL+'/removefromcart', payload,{headers});
  }

  getTotalPrice(cartItems: any[]) {
    if(cartItems.length>0){
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
    return 0;
  }
}

