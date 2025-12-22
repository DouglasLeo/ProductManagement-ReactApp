import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductsPage from "../features/products/pages/ProductsPage.tsx";
import ProductDetails from "../features/products/pages/ProductDetails.tsx";
import ProductEdit from "../features/products/pages/ProductEdit.tsx";
import ProductCreate from "../features/products/pages/ProductCreate.tsx";
import MainLayout from "../shared/components/MainLayout.tsx";
import ErrorPage from "../shared/pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products/:id/edit",
        element: <ProductEdit />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
