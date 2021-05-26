export class Product {
  [x: string]: any;
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: string;
  productCategory: Catagory[];
}

export class Catagory {
  categoryId: number;
  category?: string | null;
}
