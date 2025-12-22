import React from "react";
import type { InputProduct } from "../types/product.ts";

export function useProductForm(initialState: InputProduct) {
  const [product, setProduct] = React.useState<InputProduct>(initialState);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = event.target;
    const { name, value } = target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : value,
    }));
  }

  return {
    product,
    setProduct,
    handleChange,
  };
}
