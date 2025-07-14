import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('admin'); // padrão
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, senha, tipo });
      if (res.status === 200) {
        if (tipo === 'admin') {
          router.push('/dashboard-admin');
        } else if (tipo === 'consultor') {
          router.push('/dashboard-consultor');
        } else if (tipo === 'empresa') {
          router.push('/dashboard-empresa');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro no login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-primary">
              Faça login na sua conta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Preencha os campos abaixo para fazer login
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Endereço de e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="senha" className="sr-only">Senha</label>
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            <div>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm mt-4"
                required
              >
                <option value="admin">Administrador</option>
                <option value="consultor">Consultor</option>
                <option value="empresa">Empresa</option>
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
