import { useEffect, useState } from 'react';
import axios from 'axios';
import Cadastro from './cadastro.js'; // ajuste o caminho

export default function DashboardAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState('admin');

  // Busca usuários do tipo selecionado
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
    setUsuarioParaEditar(null);
  }, [tipoFiltro]);

  // Excluir usuário
  const excluirUsuario = async (id) => {
    if (!confirm('Confirma exclusão?')) return;

    try {
      await axios.delete(`/api/admin/usuarios/${tipoFiltro}/${id}`);
      fetchUsuarios();
    } catch (err) {
      alert('Erro ao excluir');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard Admin - Usuários</h1>

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
                  <th className="border border-gray-300 p-2">Nome</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center p-4">Nenhum usuário encontrado.</td>
                  </tr>
                )}
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-200">
                    <td className="border border-gray-300 p-2">{u.nome}</td>
                    <td className="border border-gray-300 p-2">{u.email}</td>
                    <td className="border border-gray-300 p-2 space-x-2">
                      <button
                        onClick={() => setUsuarioParaEditar(u)}
                        className="bg-accent text-white px-3 py-1 rounded hover:bg-primary transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirUsuario(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h2 className="text-xl font-semibold mb-4">{usuarioParaEditar ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
              <Cadastro
                usuarioParaEditar={usuarioParaEditar}
                tipoInicial={tipoFiltro}
                onSucesso={() => fetchUsuarios()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
