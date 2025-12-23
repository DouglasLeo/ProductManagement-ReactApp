import React from "react";
import type { Product } from "../types/product.ts";
import useFetch from "../../../shared/hooks/useFetch.ts";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/LoadingSpinner.tsx";
import ErrorPage from "../../../shared/pages/ErrorPage.tsx";
import { API_BASE_URL } from "../../../shared/config/api.ts";
import SearchInput from "../../../shared/components/SearchInput.tsx";

const PAGE_SIZE = 10;

const ProductsPage = () => {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const skip = (page - 1) * PAGE_SIZE;

  const { data, loading, error } = useFetch<Product[]>(
    `${API_BASE_URL}/products?Skip=${skip}&Take=${PAGE_SIZE + 1}`
  );

  const hasNextPage = (data?.length ?? 0) > PAGE_SIZE;
  const hasPreviousPage = page > 1;

  const filteredProducts = React.useMemo(() => {
    if (!data) return [];

    if (!search) return data.slice(0, PAGE_SIZE);

    return data.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message="Erro ao carregar produtos." />;
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-2xl font-semibold mb-6 text-slate-800">Produtos</h1>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar produto pelo nome..."
        />
      </div>

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
          filteredProducts.map((product) => (
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
