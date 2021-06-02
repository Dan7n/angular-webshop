export class Order {
  [x: string]: any;
  forEach() {
    throw new Error('Method not implemented.');
  }
  id?: number;
  companyId: number = 77726; //just a random number that represents this fictitious company
  created: string = getCurrentDate();
  createdBy: User;
  paymentMethod: string;
  totalPrice: number;
  status: number = 0;
  orderRows: OrderItem[];

  constructor(createdBy, paymentMethod, totalPrice, orderRows) {
    this.createdBy = createdBy;
    this.paymentMethod = paymentMethod;
    this.totalPrice = totalPrice;
    this.orderRows = orderRows;
  }
}

export class OrderItem {
  productId: number;
  product: string;
  amount: number = 1;

  constructor(productId, product) {
    this.productId = productId;
    this.product = product;
  }
}

export class User {
  name: string;
  telefonNumber: number;
  adress: string;
  email: string;
  constructor(name, telefonNumber, adress, email) {
    this.name = name;
    this.telefonNumber = telefonNumber;
    this.adress = adress;
    this.email = email;
  }
}

function getCurrentDate() {
  return new Date().toJSON();
}

function randomIdGenerator() {
  return Math.floor(Math.random() * (999 - 1)) + 1;
}
