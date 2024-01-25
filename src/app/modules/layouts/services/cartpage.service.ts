import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cart } from 'src/app/models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartpageService {
  private apiUrl = ''; // Replace with your API base URL

  constructor(private http: HttpClient) { }


  // CREATE
  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`cart`, cart);
  }

  // READ
  getCartList(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`cart/published`);
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(`cart/${id}`);
  }

  // UPDATE
  updateCart(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`cart/${id}`, cart);
  }

  // DELETE
  deleteCart(id: number): Observable<unknown> {
    return this.http.delete(`cart/${id}`);
  }

  
}

