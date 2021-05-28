import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-no-items-in-cart',
  templateUrl: './no-items-in-cart.component.html',
  styleUrls: ['./no-items-in-cart.component.scss'],
})
export class NoItemsInCartComponent implements OnInit {
  constructor() {}

  options: AnimationOptions = {
    path: './../../../assets/no-items.json',
  };

  ngOnInit(): void {}
}
