export class SingleOrder {
  position: number;
  orderMade: string;
  totalPrice: string;
  idFromApi: number;
  constructor(
    position: number,
    orderMade: string,
    totalPrice: number,
    idFromApi: number
  ) {
    this.position = position;
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
