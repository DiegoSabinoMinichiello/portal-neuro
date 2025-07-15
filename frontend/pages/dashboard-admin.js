import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    //Não logado, redireciona para login
    return {
      redirect: {
        destination: '/login-usuario',
        permanent: false,
      },
    };
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    if (usuario.tipo !== 'admin') {
      //Se não for admin, redireciona para página inicial
      return {
        redirect: {
          destination: '/', 
          permanent: false,
        },
      };
    }

    // Ok, pode acessar
    return { props: {} };
  } catch {
    //Token inválido ou expirado
    return {
      redirect: {
        destination: '/login-usuario',
        permanent: false,
      },
    };
  }
}

export default function DashboardAdmin() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [tipoFiltro, setTipoFiltro] = useState('admin');

  //Busca usuários do tipo selecionado
  const fetchUsuarios = async () => {
    setCarregando(true);
    try {
      const res = await axios.get(`/api/admin/usuarios/${tipoFiltro}`);
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [tipoFiltro]);

  //Excluir usuário
  const excluirUsuario = async (id) => {
    if (!confirm('Confirma exclusão?')) return;

    try {
      await axios.delete(`/api/admin/usuarios/${tipoFiltro}/${id}`, {
        withCredentials: true,
      });
      fetchUsuarios();
    } catch (err) {
      alert('Erro ao excluir');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login-usuario');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Dashboard Admin - Usuários</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>


        <div className="mb-4">
          <label className="mr-2 font-semibold">Filtrar por tipo:</label>
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="admin">Admin</option>
            <option value="consultor">Consultor</option>
            <option value="empresa">Empresa</option>
          </select>
        </div>

        {carregando ? (
          <p>Carregando usuários...</p>
        ) : (
          <>
            <table className="w-full mb-6 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Nome</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Tipo</th>
                  <th className="border border-gray-300 p-2">Telefone</th>
                  <th className="border border-gray-300 p-2">Descrição</th>
                  {tipoFiltro === 'empresa' && (
                    <th className="border border-gray-300 p-2">CNPJ</th>
                  )}
                  <th className="border border-gray-300 p-2">Ações</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="100%" className="text-center p-4">Nenhum usuário encontrado.</td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-200">
                      <td className="border border-gray-300 p-2">{u.id}</td>
                      <td className="border border-gray-300 p-2">{u.nome}</td>
                      <td className="border border-gray-300 p-2">{u.email}</td>
                      <td className="border border-gray-300 p-2">{u.tipo}</td>
                      <td className="border border-gray-300 p-2">{u.tel}</td>
                      <td className="border border-gray-300 p-2">{u.desc}</td>
                      {'cnpj' in u && (
                        <td className="border border-gray-300 p-2">{u.cnpj}</td>
                      )}
                      <td className="border border-gray-300 p-2">
                        <button
                          onClick={() => excluirUsuario(u.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Botões separados para criação */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => router.push('/cadastro?admin=1&tipo=consultor')}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition"
              >
                Criar Consultor
              </button>
              <button
                onClick={() => router.push('/cadastro?admin=1&tipo=empresa')}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition"
              >
                Criar Empresa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
