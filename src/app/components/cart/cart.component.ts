import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CartOperationsService } from 'src/app/services/cart-operations.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartOperations: CartOperationsService) {}
  cart: Product[] = [];

  ngOnInit(): void {
    this.cartOperations.getCart().subscribe((cart) => {
      cart.forEach((item) => {
        this.cart.push(item);
      });
    });

    console.log(this.cart);
  }
}
