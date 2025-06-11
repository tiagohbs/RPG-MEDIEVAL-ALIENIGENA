import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EfeitoVisual } from '../../types/battle';

interface BattleEffectsProps {
  efeitos: EfeitoVisual[];
}

const BattleEffects: React.FC<BattleEffectsProps> = ({ efeitos }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {efeitos.map((efeito) => (
          <motion.div
            key={efeito.id}
            className="absolute"
            style={{
              left: `${efeito.posicao.x}%`,
              top: `${efeito.posicao.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: efeito.intensidade,
              opacity: [0, 1, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: efeito.duracao / 1000,
              ease: 'easeOut',
            }}
          >
            {efeito.tipo === 'faisca' && (
              <div className="relative w-8 h-8">
                {/* Faísca central */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: efeito.duracao / 1000,
                    repeat: Infinity,
                  }}
                />
                {/* Raios de faísca */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  >
                    <motion.div
                      className="absolute left-1/2 top-0 w-1 h-4 bg-gradient-to-b from-yellow-400 to-red-500"
                      animate={{
                        scaleY: [1, 2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: efeito.duracao / 1000,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {efeito.tipo === 'brilho' && (
              <div className="relative w-16 h-16">
                {/* Brilho central */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cosmic-gold via-yellow-400 to-cosmic-gold rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: efeito.duracao / 1000,
                    repeat: Infinity,
                  }}
                />
                {/* Aura */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cosmic-gold via-yellow-400 to-cosmic-gold rounded-full blur-md"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: efeito.duracao / 1000,
                    repeat: Infinity,
                  }}
                />
              </div>
            )}

            {efeito.tipo === 'explosao' && (
              <div className="relative w-24 h-24">
                {/* Explosão central */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full"
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: efeito.duracao / 1000,
                  }}
                />
                {/* Ondas de choque */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-red-500 rounded-full"
                    animate={{
                      scale: [0, 2, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: efeito.duracao / 1000,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BattleEffects; 