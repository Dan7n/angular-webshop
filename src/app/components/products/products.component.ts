import { Component, OnInit } from '@angular/core';
import { Catagory, Product } from 'src/app/models/Product';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private httpClient: HttpClientService) {}

  products: Product[] = [];
  catagories = {};

  ngOnInit(): void {
    this.getProductsFromApi();
    this.getCatagories();
    console.log(this.products);
  }

  getProductsFromApi() {
    return this.httpClient.getProducts().then((productsFromApi) => {
      productsFromApi.forEach((product) => {
        this.products.push(product);
      });
    });
  }

  getCatagories() {
    return this.httpClient.catagoryLookup().subscribe((catagories) => {
      catagories.forEach((cat) => {
        this.catagories[cat.id] = cat.name;
      });
    });
  }

  catagoryFinder(id: number) {
    for (const prop in this.catagories) {
      let catagoryName = '';
      console.log(prop);
    }
  }
}
