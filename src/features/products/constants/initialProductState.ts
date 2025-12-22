import type { InputProduct } from "../types/product.ts";

export const initialProductState: InputProduct = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: "0",
  active: false,
};
