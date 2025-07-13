export default function DashboardEmpresa() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Dashboard da Empresa</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Clientes Ativos</h2>
            <p className="text-2xl font-bold text-gray-700">128</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Trabalhos em Andamento</h2>
            <p className="text-2xl font-bold text-gray-700">87</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Novos Leads</h2>
            <p className="text-2xl font-bold text-gray-700">24</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Últimos Cadastros</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between">
              <span>Joana Martins</span>
              <span className="text-sm text-gray-500">Há 2 horas</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Pedro Almeida</span>
              <span className="text-sm text-gray-500">Há 5 horas</span>
            </li>
            <li className="py-2 flex justify-between">
              <span>Ana Souza</span>
              <span className="text-sm text-gray-500">Ontem</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
