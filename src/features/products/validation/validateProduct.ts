import type { InputProduct } from "../types/product.ts";
import type { ProductErrors } from "../types/ProductErrors";

type StringRule = {
  min: number;
  max: number;
  required: string;
  minMessage: string;
  maxMessage: string;
};

function validateString(value: string, rule: StringRule) {
  if (!value.trim()) return rule.required;
  if (value.length < rule.min) return rule.minMessage;
  if (value.length > rule.max) return rule.maxMessage;
}

export function validateProduct(product: InputProduct): ProductErrors {
  const errors: ProductErrors = {};

  errors.name = validateString(product.name, {
    min: 3,
    max: 200,
    required: "Nome é obrigatório",
    minMessage: "Nome deve ter no mínimo 3 caracteres",
    maxMessage: "Nome deve ter no máximo 200 caracteres",
  });

  errors.description = validateString(product.description, {
    min: 3,
    max: 2000,
    required: "Descrição é obrigatória",
    minMessage: "Descrição deve ter no mínimo 3 caracteres",
    maxMessage: "Descrição deve ter no máximo 2000 caracteres",
  });

  if (product.price <= 0) {
    errors.price = "Preço deve ser maior que zero";
  }

  if (Number(product.quantity) <= 0) {
    errors.quantity = "Quantidade deve ser maior que zero";
  }

  Object.keys(errors).forEach(
      (key) => errors[key as keyof ProductErrors] === undefined && delete errors[key as keyof ProductErrors]
  );

  return errors;
}
