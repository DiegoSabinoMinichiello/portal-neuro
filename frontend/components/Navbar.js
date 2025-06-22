import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-orange-500">Neuro Connect</Link>
        <div className="flex items-center space-x-4">
          <Link href="/duvidas">Dúvidas</Link>
          <Link href="/sobre">Sobre nós</Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                <Link
                  href="/login-usuario"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Para Usuários
                </Link>
                <Link
                  href="/login-empresa"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Para Empresas
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
