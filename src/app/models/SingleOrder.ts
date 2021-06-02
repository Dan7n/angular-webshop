export class SingleOrder {
  position: number;
  orderMade: string;
  totalPrice: string;
  constructor(position: number, orderMade: string, totalPrice: number) {
    this.position = position;
    this.orderMade = orderMade;
    this.totalPrice = priceFormatter(totalPrice);
  }
}

const priceFormatter = (price: number): string => {
  return new Intl.NumberFormat('sv-SW', {
    style: 'currency',
    currency: 'SEK',
  }).format(price);
};
