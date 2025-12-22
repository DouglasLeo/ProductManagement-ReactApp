import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import ProductForm from "../components/ProductForm.tsx";
import { initialProductState } from "../constants/initialProductState.ts";
import { useProductForm } from "../hooks/useProductForm.ts";
import type { Product } from "../types/product.ts";
import useFetch from "../../../shared/hooks/useFetch.ts";
import LoadingSpinner from "../../../shared/components/LoadingSpinner.tsx";
import { useProductValidation } from "../hooks/useProductValidation.ts";
import {API_BASE_URL} from "../../../shared/config/api.ts";
import ErrorPage from "../../../shared/pages/ErrorPage.tsx";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error,loading } = useFetch<Product>(`${API_BASE_URL}/products/${id}`);
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
      await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...product,
          quantity: Number(product.quantity),
        }),
        headers: { "Content-Type": "application/json" },
      });

      navigate(`/products/${id}`);
    } finally {
      setSaving(false);
    }
  }

  React.useEffect(() => {
    if (data) {
      setProduct({ ...data, quantity: data.quantity.toString() });
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />
  if (!data) return null;

  return (
    <ProductForm
      title="Editar produto"
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

export default ProductEdit;
