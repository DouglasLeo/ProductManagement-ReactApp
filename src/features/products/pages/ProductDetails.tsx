import React from "react";
import useFetch from "../../../shared/hooks/useFetch.ts";
import type { Product } from "../types/product.ts";
import Button from "../../../shared/components/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../../../shared/pages/ErrorPage.tsx";
import LoadingSpinner from "../../../shared/components/LoadingSpinner.tsx";
import {API_BASE_URL} from "../../../shared/config/api.ts";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, loading } = useFetch<Product>(
    `${API_BASE_URL}/products/${id}`
  );
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      if (!id) return;

      const confirmed = window.confirm("Deseja excluir este produto?");
      if (!confirmed) return;

      const result = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" });

      if(!result.ok) throw new Error(`Falha ao deletar o produto ${result.status}`)
      navigate("/");
    }catch (error){
      if(error instanceof Error)
        alert(error.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message="Produto não encontrado." />;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-800 pb-4 break-all">
          {data.name}
        </h1>
        <h2>Descrição:</h2>
        <p className="text-slate-600 leading-relaxed break-all pb-4">
          {data.description}
        </p>
        <p className="text-xl font-semibold text-black-600">
          Preço:
          <span className=" text-emerald-600"> R$ {data.price}</span>
        </p>

        <p className="text-xl font-semibold text-black-600">
          Quantidade: {data.quantity}
        </p>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <Button
            onClick={() => navigate(`/products/${data.id}/edit`)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors"
          >
            Editar
          </Button>

          <Button
            disabled={deleteLoading}
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-60"
          >
            {deleteLoading ? "Deletando..." : "Deletar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
