export class SingleOrder {
  orderMade: string;
  totalPrice: string;
  idFromApi: number;
  constructor(orderMade: string, totalPrice: number, idFromApi: number) {
    this.orderMade = orderMade;
    this.totalPrice = priceFormatter(totalPrice);
    this.idFromApi = idFromApi;
  }
}

const priceFormatter = (price: number): string => {
  return new Intl.NumberFormat('sv-SW', {
    style: 'currency',
    currency: 'SEK',
  }).format(price);
};
