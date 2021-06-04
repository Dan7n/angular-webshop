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

  companyId = 77726;

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

  //!GET
  /**
   *
   * @returns a promise of the products array from the API
   * We don't really need an observable in this case because the data is not really going to change, and we'll only be fetching it once
   */
  getProducts() {
    return this.http.get<Product>(this.productsUrl).toPromise();
  }

  /**
   *
   * @returns a promise that contains all orders made by this fictional company
   */

  getOrdersByCompanyId() {
    return this.http
      .get<Order>(`${this.ordersEndpoint}/?companyId=${this.companyId}`)
      .toPromise();
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem('shoppingCart'));
  }

  /**
   * Checks if there's an LS object with the name shoppingCart
   */

  isLocalStorage(): boolean {
    const LS = localStorage.getItem('shoppingCart');
    return !!LS;
  }

  /**
   * Checks if localStorage exists, in chich case returns the shoppingCart object from LS
   */

  cartItems() {
    const itemsFromLS = JSON.parse(localStorage.getItem('shoppingCart'));
    if (itemsFromLS) {
      return of(itemsFromLS);
    }
  }

  //!POST
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

  //!DELETE
  /**
   *
   * @param id ID of the product on the API
   * @returns a promise containing all the products by this companyId minus the product that was deleted
   */
  removeOrderById(id: number) {
    return this.http.delete<Order>(
      `${this.ordersEndpoint}/${id}?companyId=${this.companyId}`
    );
  }
}
