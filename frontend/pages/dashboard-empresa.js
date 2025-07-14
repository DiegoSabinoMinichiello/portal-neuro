import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function DashboardEmpresa() {
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        if (res.data.user.tipo !== 'empresa') {
          router.push('/login');
        } else {
          setEmpresa(res.data.user);
        }
      } catch (err) {
        setError('Erro ao carregar dados');
        router.push('/login');
      }
    };

    fetchEmpresa();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-orange-500 mb-4">Dashboard do Empresa</h1>

        {error && <p className="text-red-500">{error}</p>}

        {empresa ? (
          <div className="space-y-2">
            <p><strong>Nome:</strong> {empresa.nome}</p>
            <p><strong>Email:</strong> {empresa.email}</p>
            <p><strong>Perfil:</strong> {empresa.tipo}</p>
          </div>
        ) : (
          <p className="text-gray-500">Carregando...</p>
        )}
      </div>
    </div>
  );
}
