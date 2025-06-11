import React from 'react';
import { Users, Gamepad2, Sparkles, Globe, Sword, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Interface para definir a estrutura de uma funcionalidade
 */
interface Funcionalidade {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ComponentType<{ className?: string }>;
  cor: string;
  detalhes: string[];
}

/**
 * Seção de funcionalidades e novidades do jogo
 * Destaca os principais recursos e características
 */
const FeaturesSection: React.FC = () => {
  // Funcionalidades principais do jogo
  const funcionalidades: Funcionalidade[] = [
    {
      id: '1',
      titulo: 'Novos Personagens',
      descricao: 'Explore raças híbridas únicas que combinam características medievais e alienígenas.',
      icone: Sparkles,
      cor: 'from-purple-600 to-purple-800',
      detalhes: [
        'Humanos Aprimorados',
        'Alienígenas Ancestrais',
        'Híbridos Cósmicos',
        'Androides Místicos'
      ],
    },
    {
      id: '2',
      titulo: 'Sistema de Combate',
      descricao: 'Batalhas estratégicas em tempo real com magia e tecnologia avançada.',
      icone: Sword,
      cor: 'from-red-600 to-red-800',
      detalhes: [
        'Combate Tático',
        'Armas Híbridas',
        'Magias Cósmicas',
        'Estratégia em Tempo Real'
      ],
    },
    {
      id: '3',
      titulo: 'Mundo Aberto',
      descricao: 'Explore planetas, estações espaciais e ruínas antigas em um universo vasto.',
      icone: Globe,
      cor: 'from-blue-600 to-blue-800',
      detalhes: [
        'Múltiplos Planetas',
        'Estações Espaciais',
        'Ruínas Alienígenas',
        'Exploração Livre'
      ],
    },
    {
      id: '4',
      titulo: 'Guildas e PvP',
      descricao: 'Forme alianças, conquiste territórios e participe de batalhas épicas.',
      icone: Shield,
      cor: 'from-green-600 to-green-800',
      detalhes: [
        'Sistema de Guildas',
        'Batalhas PvP',
        'Conquista Territorial',
        'Eventos de Guilda'
      ],
    },
    {
      id: '5',
      titulo: 'Comunidade Ativa',
      descricao: 'Conecte-se com milhares de jogadores em nossa comunidade Discord.',
      icone: Users,
      cor: 'from-indigo-600 to-indigo-800',
      detalhes: [
        'Discord Oficial',
        'Eventos Comunitários',
        'Suporte 24/7',
        'Feedback Direto'
      ],
    },
    {
      id: '6',
      titulo: 'Experiência Imersiva',
      descricao: 'Gráficos impressionantes e trilha sonora épica para total imersão.',
      icone: Gamepad2,
      cor: 'from-yellow-600 to-yellow-800',
      detalhes: [
        'Gráficos 3D',
        'Trilha Sonora Épica',
        'Efeitos Visuais',
        'Interface Intuitiva'
      ],
    },
  ];

  const abrirDiscord = () => {
    console.log('Abrindo Discord...');
    // Aqui será implementado o link para o Discord
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-medieval font-bold text-white mb-4">
            Funcionalidades <span className="text-cosmic-gold">Épicas</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Descubra tudo o que o NEXUS Medieval Espacial tem a oferecer para sua jornada cósmica
          </p>
        </motion.div>

        {/* Grid de funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {funcionalidades.map((funcionalidade, indice) => {
            const IconeFuncionalidade = funcionalidade.icone;
            return (
              <motion.div
                key={funcionalidade.id}
                className="cosmic-panel p-6 group hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: indice * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Ícone */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${funcionalidade.cor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconeFuncionalidade className="w-8 h-8 text-white" />
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-alien-glow transition-colors duration-300">
                  {funcionalidade.titulo}
                </h3>

                {/* Descrição */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {funcionalidade.descricao}
                </p>

                {/* Lista de detalhes */}
                <ul className="space-y-2">
                  {funcionalidade.detalhes.map((detalhe, indiceDetalhe) => (
                    <li key={indiceDetalhe} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-alien-glow rounded-full mr-3 flex-shrink-0" />
                      {detalhe}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Call-to-action para comunidade */}
        <motion.div
          className="cosmic-panel p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Junte-se à Nossa <span className="text-alien-crystal">Comunidade</span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Conecte-se com milhares de jogadores, participe de eventos exclusivos e receba as últimas novidades diretamente no nosso Discord oficial.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={abrirDiscord}
                className="btn-cosmic px-8 py-3 text-lg font-semibold inline-flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Entrar no Discord</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">+5.000 membros online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;