import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/"><img src="/images/logo-branca.png" alt="Neuro Connect" className="h-14" /></Link>
        <div className="flex items-center space-x-6">
          <Link href="/login-usuario" className="bg-white text-primary px-5 py-2 rounded-md hover:bg-gray-100 transition-colors">Entrar</Link>
        </div>
      </div>
    </nav>
  );
}