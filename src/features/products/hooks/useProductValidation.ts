import React from "react";
import type { ProductErrors } from "../types/ProductErrors";
import { validateProduct } from "../validation/validateProduct";
import type { InputProduct } from "../types/product.ts";

export function useProductValidation(product: InputProduct) {
  const [errors, setErrors] = React.useState<ProductErrors>({});

  function validateAll(): boolean {
    const validationErrors = validateProduct(product);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  function validateField(field: keyof ProductErrors) {
    const validationErrors = validateProduct(product);
    const fieldError = validationErrors[field];

    setErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));
  }

  function clearError(field: keyof ProductErrors) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return {
    errors,
    validateAll,
    validateField,
    clearError,
  };
}
