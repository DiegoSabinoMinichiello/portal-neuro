import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const router = useRouter();
  const queryAdmin = router.query?.admin;
  const queryTipo = router.query?.tipo;

  const isAdmin = queryAdmin === '1' || queryAdmin === true;
  const [userType, setUserType] = useState(queryTipo || 'consultor');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [desc, setDesc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnpj, setCnpj] = useState('');

  //função para formatar telefone (10 ou 11 dígitos)
  function formatPhone(value) {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    } else {
      return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
    }
  }

  //função para formatar CNPJ
  function formatCnpj(value) {
    const cleaned = value.replace(/\D/g, '');
    return cleaned
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Limpa máscara para validações e envio
    const telNumbers = tel.replace(/\D/g, '');
    const cnpjNumbers = cnpj.replace(/\D/g, '');

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (telNumbers.length !== 10 && telNumbers.length !== 11) {
      alert('Telefone deve conter 10 ou 11 dígitos numéricos.');
      return;
    }

    if (userType === 'empresa') {
      if (cnpjNumbers.length !== 14) {
        alert('CNPJ deve conter exatamente 14 números.');
        return;
      }
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
          nome: name,
          tipo: isAdmin ? userType : userType,
          tel: telNumbers,
          desc,
          cnpj: userType === 'empresa' ? cnpjNumbers : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar. Tente novamente.');
        return;
      }

      alert('Cadastro realizado com sucesso!');

      if (isAdmin) {
        router.push('/dashboard-admin');
      } else {
        router.push('/login-usuario');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar os dados. Verifique sua conexão.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-primary">
              Crie sua conta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Preencha os campos abaixo para se cadastrar
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {!isAdmin && !queryTipo && (
                <div>
                  <label htmlFor="user-type" className="sr-only">Tipo de Usuário</label>
                  <select
                    id="user-type"
                    name="user-type"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="consultor">Consultor</option>
                    <option value="empresa">Empresa</option>
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="name" className="sr-only">Nome</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Endereço de Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tel" className="sr-only">Telefone</label>
                <input
                  id="tel"
                  name="tel"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Telefone"
                  value={tel}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setTel(formatPhone(raw));
                  }}
                />
              </div>
              <div>
                <label htmlFor="desc" className="sr-only">Descrição</label>
                <input
                  id="desc"
                  name="desc"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Descreva qual tipo de consultoria você busca/oferece"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Repetir Senha</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Repetir Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {userType === 'empresa' && (
                <div>
                  <label htmlFor="cnpj" className="sr-only">CNPJ</label>
                  <input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setCnpj(formatCnpj(raw));
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
