export default function LoginUsuario() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login do Usuário</h2>
        <form className="space-y-4">
          <input type="email" placeholder="E-mail" className="w-full px-4 py-2 border rounded-md" />
          <input type="password" placeholder="Senha" className="w-full px-4 py-2 border rounded-md" />
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">Entrar</button>
        </form>
      </div>
    </div>
  );
}