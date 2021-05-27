import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches), //we use this to conditionally change our navbar
      shareReplay() //we'll be subscribing to this observable multiple times using the | async
    );

  cart = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit(): void {
    this.cartItems();
    this.badgeCount();
  }

  cartItems() {
    if (this.httpClientService.isLocalStorage()) {
      this.httpClientService.cartItems().subscribe((data) => {
        this.cart.push(data);
      });
    }
  }

  badgeCount(): number {
    const count = JSON.parse(localStorage.getItem('shoppingCart'))?.length;
    return count ? count : 0;
  }
}
