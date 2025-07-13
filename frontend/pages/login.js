import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('admin');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="admin">Admin</option>
          <option value="consultor">Consultor</option>
          <option value="empresa">Empresa</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
