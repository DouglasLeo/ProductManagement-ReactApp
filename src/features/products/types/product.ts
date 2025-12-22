export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  active: boolean;
}

export interface InputProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: string;
  active: boolean;
}
