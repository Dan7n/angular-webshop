import { Component, OnInit } from '@angular/core';
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

  //shopper information
  shopperName: string;
  shopperAdress: string;
  shopperTelNumber: number;
  shopperEmail: string;

  //payment information
  creditCardNumber: number;
  expirationDate: string;
  ccv: number;

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
    const parentCard = event.target.closest('mat-card');
    parentCard.classList.add('delete-animations');
    parentCard.addEventListener('animationend', () => {
      this.cartOperations
        .removeMovieFromCart(movie)
        .subscribe((updatedCart) => {
          this.cart = updatedCart;
        });
    });
  }

  totalPrice(): number {
    let total: number = 0;
    this.cart.forEach((item) => (total += item.price));
    return total;
  }

  handleUserInfoForm(userInfoFormObj) {
    this.shopperName = userInfoFormObj.name;
    this.shopperAdress = userInfoFormObj.adress;
    this.shopperTelNumber = userInfoFormObj.phoneNumber;
    this.shopperEmail = userInfoFormObj.email;

    console.log(
      this.shopperName,
      this.shopperAdress,
      this.shopperTelNumber,
      this.shopperEmail
    );
  }

  handlePaymentInformation(paymentInformationObje) {
    console.log(paymentInformationObje);
  }
}
