import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/battle';

interface PlayerProps {
  personagem: Character;
}

const Player: React.FC<PlayerProps> = ({ personagem }) => {
  const { nome, vidaAtual, vidaMaxima, estaAtacando, estaDefendendo, estaDerrotado } = personagem;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: estaDerrotado ? 0.5 : 1,
        opacity: estaDerrotado ? 0.5 : 1,
        y: estaAtacando ? -20 : 0,
        x: estaDefendendo ? -10 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Sprite do jogador */}
      <div className="relative w-40 h-40">
        {/* Armadura */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg"
          animate={{
            boxShadow: [
              '0 0 10px cosmic-gold',
              '0 0 20px cosmic-gold',
              '0 0 10px cosmic-gold',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Espada flamejante */}
        <motion.div
          className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-32 h-8"
          animate={{
            rotate: estaAtacando ? [0, 45, 0] : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {/* Lâmina */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-100 rounded-r-full" />
          {/* Chamas */}
          <motion.div
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-16 h-16"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Escudo */}
        {estaDefendendo && (
          <motion.div
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-16 h-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cosmic-gold to-yellow-600 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg opacity-50" />
          </motion.div>
        )}
      </div>

      {/* Barra de vida */}
      <div className="absolute -bottom-8 left-0 right-0">
        <div className="text-white font-medieval text-lg text-center mb-1">{nome}</div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-600 to-green-500"
            initial={{ width: '100%' }}
            animate={{
              width: `${(vidaAtual / vidaMaxima) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Efeitos de estado */}
      {estaAtacando && (
        <motion.div
          className="absolute inset-0 bg-red-500/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {estaDefendendo && (
        <motion.div
          className="absolute inset-0 bg-blue-500/30 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default Player; 