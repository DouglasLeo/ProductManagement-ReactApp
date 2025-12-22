import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="p-4 bg-amber-100 text-center text-sm">© 2025</footer>
    </div>
  );
};

export default MainLayout;
