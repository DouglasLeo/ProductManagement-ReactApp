import React from "react";
import type { Product } from "../types/product.ts";
import useFetch from "../../../shared/hooks/useFetch.ts";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/LoadingSpinner.tsx";
import ErrorPage from "../../../shared/pages/ErrorPage.tsx";
import { API_BASE_URL } from "../../../shared/config/api.ts";

const PAGE_SIZE = 10;

const ProductsPage = () => {
  const [page, setPage] = React.useState(1);
  const skip = (page - 1) * PAGE_SIZE;

  const url = `${API_BASE_URL}/products?Skip=${skip}&Take=${PAGE_SIZE + 1}`;

  const { data, loading, error } = useFetch<Product[]>(url);

  const hasNextPage = (data?.length ?? 0) > PAGE_SIZE;

  const hasPreviousPage = page > 1;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message="Erro ao carregar produtos." />;
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-slate-800">Produtos</h1>

      <ul className="space-y-4">
        {data.length === 0 ? (
          <Link
            className="
            inline-flex items-center gap-2
            rounded-full
          bg-amber-600
            px-5 py-2
            font-semibold text-white
            shadow-md
            transition
          hover:bg-amber-700
            justify-center
            hover:shadow-lg
            focus:outline-none
            focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            to="/products/create"
          >
            + Criar produto
          </Link>
        ) : (
          data.map((product) => (
            <li
              key={product.id}
              className="bg-white border border-slate-200 rounded-lg  shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                to={`/products/${product.id}`}
                className="flex justify-between items-center p-4"
              >
                <span className="font-medium text-slate-700">
                  {product.name}
                </span>
                <span className="font-semibold text-emerald-600">
                  R$ {product.price}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
      {(hasPreviousPage || hasNextPage) && (
        <div className="flex justify-center gap-4 mt-8">
          {hasPreviousPage && (
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              ← Anterior
            </button>
          )}

          <span className="flex items-center text-slate-600 font-medium">
            Página {page}
          </span>

          {hasNextPage && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Próxima →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
