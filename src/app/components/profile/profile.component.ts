import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AnimationOptions } from 'ngx-lottie';
import { MatTableDataSource } from '@angular/material/table';
import { SingleOrder } from 'src/app/models/SingleOrder';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'orderMade', 'totalPrice'];

  allOrderByThisComponay = [];
  tableData;

  isLoggedIn: boolean = false;

  lottieOptions: AnimationOptions = {
    path: './../../../assets/relax.json',
  };

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.isLoggedIn = false;
    setTimeout(() => {
      this.getOrdersFromApi();
    }, 4000);
    console.log(this.allOrderByThisComponay);
  }

  getOrdersFromApi() {
    this.isLoggedIn = false;
    this.httpClientService.getOrdersByCompanyId().then((orders) => {
      this.isLoggedIn = true;
      if (orders) {
        orders.map((order, i) => {
          const newSingleOrder: SingleOrder = new SingleOrder(
            i + 1,
            order.created,
            order.totalPrice
          );
          this.allOrderByThisComponay.push(newSingleOrder);
        });
        this.tableData = new MatTableDataSource(this.allOrderByThisComponay);
        this.tableData.paginator = this.paginator;
      }

      this.allOrderByThisComponay;
    });
  }
}
