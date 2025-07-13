import { useState } from 'react';
import axios from 'axios';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        nome,
        email,
        senha,
        tipo,
      });

      if (res.status === 201) {
        setSuccess('Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setTipo('admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro no cadastro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Cadastro</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="admin">Admin</option>
          <option value="consultor">Consultor</option>
          <option value="empresa">Empresa</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
