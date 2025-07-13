import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section id="neurodivergentes" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Benefícios da Diversidade Neurocognitiva</h2>
          <p className="text-lg text-primary mb-8 text-center">Estudos indicam que equipes neurodiversas podem superar as homogêneas em até 36% em termos de rentabilidade, evidenciando que a diversidade de perspectivas contribui para a inovação e eficiência organizacional. Fonte: cajuina.org</p>
        </div>
      </section>

      <section id="mercado-trabalho" className="py-16 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-secondary mb-12">Quem são os Neurodivergentes?</h2>
          <p className="text-xl text-secondary mb-6">São pessoas cuja o funcionamento neurológico difere da norma ou do que é considerada típica pela sociedade. Essas diferenças neurológicas podem variar de maneira como uma pessoa pensa, aprende, processa informações, se comporta, interesse socialmente e experimenta o mundo ao seu redor.</p>
          <ul className="list-disc list-inside text-lg text-secondary mb-8 text-left">
            <li>TEA (Transtorno do Espectro Autista)</li>
            <li>TDAH (Transtorno do Déficit de Atenção e Hiperatividade)</li>
            <li>Dislexia</li>
            <li>Outros</li>
          </ul>
        </div>
      </section>

      <section id="beneficios-diversidade" className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Neurodivergentes no mercado de trabalho:</h2>
          <p className="text-xl text-primary mb-6">IBGE (2019): 85% das pessoas autistas estão desempregadas. Em nível mundial esse número é de 80% conforme a OMS, 2020.</p>
          <p className="text-xl text-primary mb-6">Consultoria McKinsey (USA): Neurodivergentes em suas equipes têm 33% mais prospensão à rentabilidade.</p>
        </div>
      </section>

      <section id="equipe" className="py-20 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-secondary mb-12">Nossa Equipe</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img src="/images/foto-perfil-exemplo-02.png" alt="Mônica Ferri" className="mx-auto mb-6 rounded-full h-32 w-32 object-cover"/>
              <h3 className="text-2xl font-bold mb-2 text-primary">Mônica Ferri</h3>
              <p className="text-primary">CTO e Pedagoga pela UFFS</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img src="/images/foto-perfil-exemplo-02.png" alt="Gabriela Ribeiro" className="mx-auto mb-6 rounded-full h-32 w-32 object-cover"/>
              <h3 className="text-2xl font-bold mb-2 text-primary">Gabriela Ribeiro</h3>
              <p className="text-primary">CFO e Administradora pela PUC-GO</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img src="/images/foto-perfil-exemplo-02.png" alt="Letícia Matias" className="mx-auto mb-6 rounded-full h-32 w-32 object-cover"/>
              <h3 className="text-2xl font-bold mb-2 text-primary">Letícia Matias</h3>
              <p className="text-primary">CMO e Enfermeira pela UFFS</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img src="/images/foto-perfil-exemplo-01.png" alt="Diego Minichiello" className="mx-auto mb-6 rounded-full h-32 w-32 object-cover"/>
              <h3 className="text-2xl font-bold mb-2 text-primary">Diego Minichiello</h3>
              <p className="text-primary">CTO e Cientista da Computação pela UFFS</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <img src="/images/foto-perfil-exemplo-01.png" alt="Paulo Nunes" className="mx-auto mb-6 rounded-full h-32 w-32 object-cover"/>
              <h3 className="text-2xl font-bold mb-2 text-primary">Paulo Nunes</h3>
              <p className="text-primary">Engenheiro de Software e Cientista da Computação pela UFFS</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}