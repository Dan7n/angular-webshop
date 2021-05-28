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

  /**
   * Will be used to add delete animation
   */
  willBeDeleted: boolean = false;

  ngOnInit(): void {
    this.getCart();
    this.totalPrice();
  }

  getCart() {
    this.cartOperations.getCartFromLocalStorage().subscribe((cart) => {
      cart.forEach((item) => {
        this.cart.push(item);
      });
    });
  }

  priceFormatter(price: number) {
    return new Intl.NumberFormat('sv-SW', {
      style: 'currency',
      currency: 'SEK',
    }).format(price);
  }

  removeFromCart(movie: Product, event) {
    //ugly code, but its basically traversing the DOM family tree and finding the card element that the click event bubbles up to
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
      'delete-animations'
    );
    setTimeout(() => {
      this.cartOperations
        .removeMovieFromCart(movie)
        .subscribe((updatedCart) => {
          this.cart = updatedCart;
        });
    }, 800);
  }

  totalPrice(): number {
    let total: number = 0;
    this.cart.forEach((item) => (total += item.price));
    return total;
  }
}
