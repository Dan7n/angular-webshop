import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AnimationOptions } from 'ngx-lottie';
import { MatTableDataSource } from '@angular/material/table';
import { SingleOrder } from 'src/app/models/SingleOrder';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['orderMade', 'totalPrice', 'delete'];

  allOrderByThisComponay = [];
  tableData;

  isLoggedIn: boolean = false;

  lottieOptions: AnimationOptions = {
    path: './../../../assets/relax.json',
  };

  constructor(
    private httpClientService: HttpClientService,
    public matDialog: MatDialog
  ) {}

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
            order.created,
            order.totalPrice,
            order.id
          );
          this.allOrderByThisComponay.push(newSingleOrder);
        });
        this.tableData = new MatTableDataSource(this.allOrderByThisComponay);
        this.tableData.paginator = this.paginator;
      }

      this.allOrderByThisComponay;
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.matDialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpClientService.removeOrderById(id).subscribe((result) => {
          const idx = this.tableData.data.findIndex((el) => {
            return el.idFromApi === result.id;
          });
          //remove object from table's data source and update the changes with a built-in funciton
          this.tableData.data.splice(idx, 1);
          this.tableData._updateChangeSubscription();
        });
      }
    });
  }

  timeFormatter(time: string): string {
    const date = new Date(time);
    return date.toLocaleString();
  }
}
