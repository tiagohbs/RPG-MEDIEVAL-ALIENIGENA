import React from 'react';
import { ChevronDown, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';

/**
 * Seção principal (Hero) da página inicial
 * Contém título, subtítulo e call-to-action principal
 */
const HeroSection: React.FC = () => {
  const { dispatch } = useGame();

  const jogarAgora = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'character-creation' });
  };

  const rolarParaProximaSecao = () => {
    const proximaSecao = document.getElementById('noticias');
    if (proximaSecao) {
      proximaSecao.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fundo com gradiente e partículas */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-darkBlue via-purple-900 to-black">
        <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23805ad5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-50`} />
      </div>

      {/* Efeitos visuais de fundo */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, indice) => (
          <motion.div
            key={indice}
            className="absolute w-2 h-2 bg-alien-glow rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: indice * 0.5,
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Título principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medieval font-bold mb-6">
            <span className="bg-gradient-to-r from-cosmic-gold via-alien-crystal to-alien-glow bg-clip-text text-transparent">
              NEXUS
            </span>
            <br />
            <span className="text-white text-4xl sm:text-5xl lg:text-6xl">
              Medieval Espacial
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Onde a magia ancestral encontra a tecnologia cósmica.
            <br />
            Forje seu destino entre ruínas alienígenas e castelos estelares.
          </motion.p>

          {/* Botão principal */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button
              onClick={jogarAgora}
              className="group relative px-8 py-4 bg-gradient-to-r from-cosmic-purple to-alien-energy rounded-lg font-bold text-lg text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-alien-glow/50 border border-alien-crystal/30"
            >
              <div className="flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>Jogar Agora</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-alien-glow to-cosmic-gold opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
            </button>

            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Gratuito para jogar</span>
            </div>
          </motion.div>

          {/* Estatísticas do jogo */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-cosmic-gold">5+</div>
              <div className="text-sm text-gray-400">Raças Únicas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-alien-crystal">12+</div>
              <div className="text-sm text-gray-400">Classes Híbridas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-alien-glow">∞</div>
              <div className="text-sm text-gray-400">Possibilidades</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Botão para rolar para baixo */}
        <motion.button
          onClick={rolarParaProximaSecao}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-alien-glow transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;