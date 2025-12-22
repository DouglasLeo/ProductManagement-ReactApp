import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-amber-400 text-white shadow-md">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between overflow-hidden max-[600px]:flex-col
          max-[600px]:h-auto
          max-[600px]:py-3
          gap-2">
        <Link to="/">
          <h1 className="text-xl font-semibold max-[600px]:text-lg
              max-[600px]:text-center">Gerenciamento de produtos</h1>
        </Link>
        <nav className="flex gap-6 max-[600px]:justify-center
            max-[600px]:w-full">
          <Link
            to="/"
            className="text-sm hover:text-slate-300 transition-colors underline py-1 px-2"
          >
            Home
          </Link>
          <Link
            to="/products/create"
            className="text-sm hover:text-slate-300 transition-colors underline py-1 px-2"
          >
            Criar Produto
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
