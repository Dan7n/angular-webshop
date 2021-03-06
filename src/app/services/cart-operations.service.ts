import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';
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
      const ids = moviesFromLS.map((el) => el.id);

      //prevent duplicates to be added to the LS
      ids.forEach((id) => {
        //only add if the movie does NOT exist in LS
        if (ids.indexOf(movie.id) === -1) {
          const joinedCart = [...moviesFromLS, movie];
          localStorage.setItem('shoppingCart', JSON.stringify(joinedCart));
          this.openSnackbar('Item has been added to your cart');
        } else {
          return this.openSnackbar('This movie already exists in your cart');
        }
      });
    } else {
      //if there's no shoppingCart in localStorage
      localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
      this.openSnackbar('Item has been added to your cart');
    }
  }

  /**
   *
   * @returns an observable that contains the cart array that's returned form LS
   */
  getCartFromLocalStorage() {
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

  /**
   *
   * Will find the movie index and remove it from the cart array
   * if the array is empty it will delete the shoppingCart object from localStorage to prevent bugs
   *
   * @returns the updated cart array so that we can use it in our component
   */

  removeMovieFromCart(movie: Product) {
    this.getCartFromLocalStorage().subscribe((data) => {
      const index = data.findIndex((el) => {
        return el.id == movie.id;
      });

      index !== -1 && data.splice(index, 1);

      //check if there are no items left in cart
      if (!data.length) {
        this.cart = [];
        localStorage.removeItem('shoppingCart');
      } else {
        //update local cart array
        this.cart = data;
        //update localStorage
        const newLocaStorageObject = JSON.stringify(data);
        this.updateLocalStorage(newLocaStorageObject);
      }
    });

    return of(this.cart);
  }

  updateLocalStorage(newObject) {
    if (this.httpClient.isLocalStorage()) {
      localStorage.setItem('shoppingCart', newObject);
    }
  }

  destroyLocalStorage() {
    if (this.httpClient.isLocalStorage()) {
      localStorage.removeItem('shoppingCart');
    }
  }
}
