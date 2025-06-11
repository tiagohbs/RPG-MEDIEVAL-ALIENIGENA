import React from 'react';
import { motion } from 'framer-motion';
import { Character } from '../../types/battle';

interface EnemyProps {
  personagem: Character;
}

const Enemy: React.FC<EnemyProps> = ({ personagem }) => {
  const { nome, vidaAtual, vidaMaxima, estaAtacando, estaDefendendo, estaDerrotado } = personagem;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: estaDerrotado ? 0.5 : 1,
        opacity: estaDerrotado ? 0.5 : 1,
        y: estaAtacando ? -20 : 0,
        x: estaDefendendo ? 10 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Sprite do inimigo */}
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0 bg-alien-crystal rounded-full"
          animate={{
            boxShadow: [
              '0 0 10px alien-glow',
              '0 0 20px alien-glow',
              '0 0 10px alien-glow',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-alien-energy opacity-50 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Barra de vida */}
      <div className="absolute -bottom-8 left-0 right-0">
        <div className="text-white font-medieval text-sm text-center mb-1">{nome}</div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-red-500"
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
          className="absolute inset-0 bg-red-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />
      )}
      {estaDefendendo && (
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default Enemy; 