import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { HttpClientService } from './http-client.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartOperationsService {
  private cart = [];

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClientService
  ) {}

  openSnackbar(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
    });
  }

  addProductToCart(movie: Product) {
    this.cart.push(movie);
    const moviesFromLS = JSON.parse(localStorage.getItem('shoppingCart'));
    if (moviesFromLS) {
      moviesFromLS.forEach((obj) => {
        if (obj.id === movie.id) {
          this.openSnackbar('This movie already exists in your cart');
        } else {
          const joinedCart = [movie, ...moviesFromLS];
          localStorage.setItem('shoppingCart', JSON.stringify(joinedCart));
          this.openSnackbar('Item has been added to your cart');
        }
      });
    } else {
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
      this.openSnackbar('Item has been added to your cart');
    }
  }

  getCart() {
    let cart = [];
    if (this.httpClient.isLocalStorage()) {
      this.httpClient.cartItems().subscribe((data) => {
        data.forEach((itemInCart) => {
          cart.push(itemInCart);
        });
      });
    }
    return of(cart);
  }
}
