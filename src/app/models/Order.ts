export class Order {
  id: number;
  companyId: number = 77726; //just a random number that represents this fictitious company
  created: string = getCurrentDate();
  createdBy: User;
  paymentMethod: string;
  totalPrice: number;
  status: number = 0;
  orderRows: OrderItems[];

  constructor(id, createdBy, paymentMethod, totalPrice, orderRows) {
    this.id = id;
    this.createdBy = createdBy;
    this.paymentMethod = paymentMethod;
    this.totalPrice = totalPrice;
    this.orderRows = orderRows;
  }
}

export class OrderItems {
  id: number;
  productId: number;
  amount: number = 1;
  orderId: number;
}

export class User {
  name: string;
  telefonNumber: number;
  adress: string;
  email: string;
}

function getCurrentDate() {
  const date = new Date(Date.now());
  return date.toLocaleString();
}

function randomIdGenerator() {
  return Math.floor(Math.random() * (99999999 - 1)) + 1;
}
