import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  private productsUrl: string =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/products';

  catagories: string =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/categories';

  /**
   *
   * @returns a promise of the products array from the API
   * We don't really need an observable in this case because the data is not really going to change, and we'll only be fetching it once
   */
  getProducts() {
    return this.http.get<Product>(this.productsUrl).toPromise();
  }

  catagoryLookup() {
    return this.http.get(this.catagories);
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem('shoppingCart'));
  }

  isLocalStorage(): boolean {
    const LS = localStorage.getItem('shoppingCart');
    return !!LS;
  }

  cartItems() {
    const itemsFromLS = JSON.parse(localStorage.getItem('shoppingCart'));
    if (itemsFromLS) {
      return of(itemsFromLS);
    }
  }
}
