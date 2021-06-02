import { Component, OnInit } from '@angular/core';
import { Catagory, Product } from 'src/app/models/Product';
import { HttpClientService } from 'src/app/services/http-client.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CartOperationsService } from 'src/app/services/cart-operations.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private httpClient: HttpClientService,
    private snackBar: MatSnackBar,
    private cartOperations: CartOperationsService
  ) {}

  products: Product[] = [];
  catagories = {};
  pageReady: boolean = false;

  ngOnInit(): void {
    this.getProductsFromApi();
    this.getCatagories();
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

  getCatagories() {
    // return this.httpClient.catagoryLookup().subscribe((catagories) => {
    //   catagories.forEach((cat) => {
    //     this.catagories[cat.id] = cat.name;
    //   });
    // });
  }

  catagoryFinder(id: number) {
    for (const prop in this.catagories) {
      let catagoryName = '';
      console.log(prop);
    }
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
