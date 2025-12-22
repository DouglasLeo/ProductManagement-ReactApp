const ErrorPage = ({ message }: { message?: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold text-red-500 text-center">
      {message ? message : "Página não encontrada."}
    </h1>
  </div>
);

export default ErrorPage;
