import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBattle } from '../../contexts/BattleContext';
import Player from './Player';
import Enemy from './Enemy';
import BattleEffects from './BattleEffects';

export const BattleScene: React.FC = () => {
  const { estado, iniciarBatalha } = useBattle();

  useEffect(() => {
    iniciarBatalha();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen bg-gradient-to-b from-cosmic-darkBlue to-black overflow-hidden"
    >
      {/* Efeitos de partículas de fundo */}
      <div className="absolute inset-0">
        <BattleEffects efeitos={estado.efeitosAtivos} />
      </div>

      {/* Área de batalha */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Jogador */}
        <div className="absolute bottom-20 left-1/4 transform -translate-x-1/2">
          <Player personagem={estado.jogador} />
        </div>

        {/* Inimigos */}
        <div className="absolute top-20 right-1/4 flex gap-8">
          {estado.inimigos.map((inimigo) => (
            <Enemy key={inimigo.id} personagem={inimigo} />
          ))}
        </div>

        {/* Interface de batalha */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 p-4 bg-black/50">
          <div className="text-white font-medieval text-lg">
            Turno: {estado.turnoAtual === 'jogador' ? 'Seu Turno' : 'Turno dos Inimigos'}
          </div>
          <div className="text-white font-medieval text-lg">
            Vida: {estado.jogador.vidaAtual}/{estado.jogador.vidaMaxima}
          </div>
        </div>

        {/* Mensagem de combate */}
        {estado.combateAtivo && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cosmic-gold font-tech text-2xl"
          >
            {estado.turnoAtual === 'jogador' ? 'Seu Turno!' : 'Inimigos Atacam!'}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 