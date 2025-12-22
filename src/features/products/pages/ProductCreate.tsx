import { useNavigate } from "react-router-dom";
import React from "react";
import ProductForm from "../components/ProductForm.tsx";
import { initialProductState } from "../constants/initialProductState.ts";
import { useProductForm } from "../hooks/useProductForm.ts";
import { useProductValidation } from "../hooks/useProductValidation.ts";
import {API_BASE_URL} from "../../../shared/config/api.ts";

const ProductCreate = () => {
  const navigate = useNavigate();
  const { product, setProduct, handleChange } =
    useProductForm(initialProductState);
  const { errors, validateAll, validateField, clearError } =
    useProductValidation(product);
  const [saving, setSaving] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateAll()) return;
    setSaving(true);

    try {
      const result = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          ...product,
          quantity: Number(product.quantity),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if(!result.ok) throw new Error(`Falha ao criar produto ${result.status}`)

      navigate("/");
    }catch (error){
      if(error instanceof Error)
        alert(error.message);
    }
    finally {
      setSaving(false);
    }
  }

  return (
    <ProductForm
      title="Criar produto"
      product={product}
      saving={saving}
      errors={errors}
      onChange={(event) => {
        clearError(event.target.name as keyof typeof errors);
        handleChange(event);
      }}
      onPriceChange={(price) => {
        clearError("price");
        setProduct((prev) => ({ ...prev, price }));
      }}
      onQuantityChange={(quantity) => {
        clearError("quantity");
        setProduct((prev) => ({ ...prev, quantity }));
      }}
      onCheckBoxChange={(checked) =>
        setProduct((prev) => ({ ...prev, active: checked }))
      }
      onBlur={(event) => {
        validateField(event.target.name as keyof typeof errors);
      }}
      onPriceBlur={() => validateField("price")}
      onQuantityBlur={() => validateField("quantity")}
      onSubmit={handleSubmit}
    />
  );
};

export default ProductCreate;
