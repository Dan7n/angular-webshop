import { Component, OnInit } from '@angular/core';
import { Order, OrderItem, User } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { CartOperationsService } from 'src/app/services/cart-operations.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartOperations: CartOperationsService,
    private httpService: HttpClientService
  ) {}
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
  paymentMethod: string;

  isFormOneValid: boolean = false;
  isFormTwoValid: boolean = false;

  orderSubmitted: boolean = false;

  stepIndex: number;

  lottieOptions = {
    path: './../../../assets/confetti.json',
  };

  ngOnInit(): void {
    this.getCart();
    this.totalPrice();
    this.isFormOneValid = false;
    this.isFormTwoValid = false;
    this.orderSubmitted = false;
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
    this.isFormOneValid = true;
  }

  randomIdGenerator(): number {
    return Math.floor(Math.random() * (999 - 1)) + 1;
  }

  handlePaymentInformation(paymentInformationObj, matStepper) {
    this.isFormTwoValid = true;
    setTimeout(() => {
      matStepper.selectedIndex = 3;
    });
    const { cardNumber, ccv, expirationDate, paymentMethod } =
      paymentInformationObj;
    this.creditCardNumber = cardNumber;
    this.expirationDate = expirationDate;
    this.ccv = ccv;
    this.paymentMethod = paymentMethod;

    this.sendOrderToHttpService();
  }

  sendOrderToHttpService() {
    //create order object with all items in cart
    const orderRows = [];
    for (const movie of this.cart) {
      const newOrderItem = new OrderItem(movie.id, movie.name);
      orderRows.push(newOrderItem);
    }

    //create user object from the information that the user provided
    const user = new User(
      this.shopperName,
      this.shopperTelNumber,
      this.shopperAdress,
      this.shopperEmail
    );

    const newOrder = new Order(
      JSON.stringify(user),
      this.paymentMethod,
      this.totalPrice(),
      [...orderRows]
    );

    this.httpService.sendOrderToApi(newOrder).then((data) => {
      if (data) {
        console.log(data);
        this.orderSubmitted = true;
        this.cartOperations.destroyLocalStorage();
      }
    });
  }
}
