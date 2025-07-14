import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">Neuro Connect: Consultorias com neurodivergentes para desenvolvimento de empresas.</h1>
            <div className="text-lg text-primary mb-8"> 
              <p>Realizando o sonho da vida profissional dos neurodivergentes.</p>
            </div>
          <Link href="/cadastro" className="bg-primary text-white font-bold px-8 py-3 rounded-md hover:bg-secondary transition-colors">Cadastre-se</Link>
        </div>
        <div>
          <img src="/images/consultoria-02.png" alt="Ilustração da plataforma" className="rounded-lg shadow-lg"/>
        </div>
      </div>
    </section>
  )
}