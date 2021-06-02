import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AnimationOptions } from 'ngx-lottie';
import { MatTableDataSource } from '@angular/material/table';
import { SingleOrder } from 'src/app/models/SingleOrder';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  allOrderByThisComponay = [];

  tableData = new MatTableDataSource(this.allOrderByThisComponay);
  displayedColumns: string[] = ['position', 'orderMade', 'totalPrice'];

  //TODO change to false when you're done testing
  isLoggedIn: boolean = true;

  lottieOptions: AnimationOptions = {
    path: './../../../assets/relax.json',
  };

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    // this.isLoggedIn = false;

    // setTimeout(() => {
    this.getOrdersFromApi();
    // }, 4000);
  }

  getOrdersFromApi() {
    this.isLoggedIn = false;
    this.httpClientService.getOrdersByCompanyId().then((orders) => {
      this.isLoggedIn = true;
      if (orders) {
        orders.map((order, i) => {
          // console.log(order);
          const newSingleOrder: SingleOrder = new SingleOrder(
            i + 1,
            order.created,
            order.totalPrice
          );
          this.allOrderByThisComponay.push(newSingleOrder);
        });
      }

      this.allOrderByThisComponay;
    });
  }
}
