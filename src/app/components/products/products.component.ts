import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CartOperationsService } from 'src/app/services/cart-operations.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private httpClient: HttpClientService,
    private cartOperations: CartOperationsService
  ) {}

  products: Product[] = [];
  catagories = {};
  pageReady: boolean = false;

  ngOnInit(): void {
    this.getProductsFromApi();
  }

  lottieOptions = {
    path: './../../../assets/scroll-down.json',
  };

  scrollDown(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  getProductsFromApi() {
    return this.httpClient.getProducts().then((productsFromApi) => {
      if (productsFromApi) {
        productsFromApi.forEach((product) => {
          this.products.push(product);
        });
        this.pageReady = true;
      }
    });
  }

  priceFormatter(price: number) {
    return new Intl.NumberFormat('sv-SW', {
      style: 'currency',
      currency: 'SEK',
    }).format(price);
  }

  handleAddToCart(movie: Product) {
    this.cartOperations.addProductToCart(movie);
  }
}
