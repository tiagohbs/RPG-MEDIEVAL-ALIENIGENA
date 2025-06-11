import React, { useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';

const TILE_SIZE = 32; // Tamanho de cada tile em pixels
const MAP_SIZE = 20; // Tamanho do mapa em tiles

const GameWorld: React.FC = () => {
  const { state, dispatch } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Inicializa o canvas e desenha o mapa
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.player) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o mapa de fundo
    for (let y = 0; y < MAP_SIZE; y++) {
      for (let x = 0; x < MAP_SIZE; x++) {
        // Alterna entre diferentes tipos de terreno
        const isEven = (x + y) % 2 === 0;
        ctx.fillStyle = isEven ? '#2d3748' : '#1a202c';
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }

    // Desenha o jogador
    ctx.fillStyle = '#805ad5';
    ctx.beginPath();
    ctx.arc(
      state.player.position.x * TILE_SIZE + TILE_SIZE / 2,
      state.player.position.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [state.player?.position]);

  // Gerencia o movimento do jogador
  useEffect(() => {
    if (!state.player) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const newPosition = { ...state.player!.position };

      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, newPosition.y - 1);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(MAP_SIZE - 1, newPosition.y + 1);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, newPosition.x - 1);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(MAP_SIZE - 1, newPosition.x + 1);
          break;
        default:
          return;
      }

      dispatch({
        type: 'UPDATE_PLAYER_STATS',
        payload: { position: newPosition },
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.player, dispatch]);

  if (!state.player) return null;

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
      {/* Canvas do jogo */}
      <canvas
        ref={canvasRef}
        width={MAP_SIZE * TILE_SIZE}
        height={MAP_SIZE * TILE_SIZE}
        className="border-2 border-purple-500 rounded-lg shadow-lg"
      />

      {/* Interface do jogador */}
      <div className="absolute top-4 left-4 bg-gray-800 p-4 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-bold mb-2">{state.player.name}</h2>
        <div className="space-y-2">
          <div>
            <span className="text-gray-400">Raça:</span>{' '}
            <span className="text-purple-400">
              {state.player.race === 'human'
                ? 'Humano'
                : state.player.race === 'alien'
                ? 'Alienígena'
                : 'Híbrido'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Classe:</span>{' '}
            <span className="text-purple-400">
              {state.player.class === 'warrior'
                ? 'Guerreiro'
                : state.player.class === 'mage'
                ? 'Mago'
                : state.player.class === 'rogue'
                ? 'Ladino'
                : 'Cientista'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Nível:</span>{' '}
            <span className="text-purple-400">{state.player.level}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Vida:</span>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: `${(state.player.health / state.player.maxHealth) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Mana:</span>
            <div className="w-32 h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${(state.player.mana / state.player.maxMana) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="absolute bottom-4 left-4 bg-gray-800 p-4 rounded-lg shadow-lg text-white">
        <p className="text-sm text-gray-400">
          Use as setas do teclado para mover o personagem
        </p>
      </div>
    </div>
  );
};

export default GameWorld; 