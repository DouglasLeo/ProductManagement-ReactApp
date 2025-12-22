import React from "react";

interface HttpError extends Error {
  status?: number;
}

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await fetch(url, {
          signal,
          ...optionsRef.current,
        });

        if (!result.ok) {
          throw new Error(
            result.status === 404
              ? "Produto não encontrado"
              : "Erro ao carregar produto"
          );
        }

        const json = (await result.json()) as T;

        if (!signal.aborted) setData(json);
      } catch (error) {
        const httpError = error as HttpError;
        if (!signal.aborted) setError(httpError);
      } finally {
        if (!signal.aborted) setLoading(false);
        console.log(error);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
