import React from 'react';
import { useGame } from '../contexts/GameContext';
import CharacterCreation from './screens/CharacterCreation';
import GameWorld from './screens/GameWorld';
import Combat from './screens/Combat';
import Dialogue from './screens/Dialogue';
import BattleScene from './battle/BattleScene';
import { BattleProvider } from '../contexts/BattleContext';

/**
 * Roteador principal do jogo
 * Gerencia a navegação entre as diferentes telas
 */
const GameRouter: React.FC = () => {
  const { currentScreen } = useGame();

  // Renderiza a tela apropriada baseada na fase do jogo
  const renderScreen = (): React.ReactElement => {
    switch (currentScreen) {
      case 'character-creation':
        return <CharacterCreation />;
      case 'game-world':
        return <GameWorld />;
      case 'combat':
        return <Combat />;
      case 'dialogue':
        return <Dialogue />;
      case 'battle':
        return (
          <BattleProvider>
            <BattleScene />
          </BattleProvider>
        );
      default:
        return <CharacterCreation />;
    }
  };

  return (
    <div className="relative z-10 w-full h-screen">
      {renderScreen()}
    </div>
  );
};

export default GameRouter;