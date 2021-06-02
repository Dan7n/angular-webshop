import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/Product';
import { of } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  options: {
    headers: HttpHeaders;
    params: HttpParams;
    responseType: 'json';
  };

  private productsUrl: string =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/products';

  private catagories: string =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/categories';

  private ordersEndpoint: string =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/orders';

  /**
   *
   * @returns a promise of the products array from the API
   * We don't really need an observable in this case because the data is not really going to change, and we'll only be fetching it once
   */
  getProducts() {
    return this.http.get<Product>(this.productsUrl).toPromise();
  }

  getOrdersByCompanyId() {
    const companyId = 77726;
    return this.http
      .get<Order>(`${this.ordersEndpoint}/?companyId=${companyId}`)
      .toPromise();
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

  /**
   * Since we're only posting the data once, it makes more sense to handle this POST request as a promise
   * instead of an observable
   */
  sendOrderToApi(orderObject) {
    return this.http
      .post<Order>(this.ordersEndpoint, orderObject, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .toPromise();
  }
}
