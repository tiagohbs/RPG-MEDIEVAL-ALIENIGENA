import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  type: 'alien' | 'creature' | 'robot';
}

const Combat: React.FC = () => {
  const { state, dispatch } = useGame();
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  // Inicializa um inimigo aleatório quando o combate começa
  useEffect(() => {
    if (!enemy) {
      const enemyTypes: Enemy[] = [
        {
          id: crypto.randomUUID(),
          name: 'Alienígena Hostil',
          health: 80,
          maxHealth: 80,
          damage: 15,
          type: 'alien',
        },
        {
          id: crypto.randomUUID(),
          name: 'Criatura Mutante',
          health: 120,
          maxHealth: 120,
          damage: 20,
          type: 'creature',
        },
        {
          id: crypto.randomUUID(),
          name: 'Robô de Defesa',
          health: 100,
          maxHealth: 100,
          damage: 18,
          type: 'robot',
        },
      ];

      setEnemy(enemyTypes[Math.floor(Math.random() * enemyTypes.length)]);
      setCombatLog(['Um inimigo apareceu!']);
    }
  }, [enemy]);

  // Lógica do turno do inimigo
  useEffect(() => {
    if (!isPlayerTurn && enemy && state.player) {
      const timer = setTimeout(() => {
        const damage = Math.floor(enemy.damage * (0.8 + Math.random() * 0.4));
        const newHealth = Math.max(0, state.player!.health - damage);
        
        dispatch({
          type: 'UPDATE_PLAYER_STATS',
          payload: { health: newHealth },
        });

        setCombatLog((prev: string[]) => [
          ...prev,
          `${enemy.name} causou ${damage} de dano!`,
        ]);

        if (newHealth <= 0) {
          setCombatLog((prev: string[]) => [...prev, 'Você foi derrotado!']);
          setTimeout(() => {
            dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'exploring' });
          }, 2000);
        } else {
          setIsPlayerTurn(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, enemy, state.player, dispatch]);

  const handleAttack = (): void => {
    if (!enemy || !state.player || !isPlayerTurn) return;

    const damage = Math.floor(
      (state.player.class === 'warrior' ? 25 : 15) * (0.8 + Math.random() * 0.4)
    );
    const newEnemyHealth = Math.max(0, enemy.health - damage);

    setEnemy({ ...enemy, health: newEnemyHealth });
    setCombatLog((prev: string[]) => [
      ...prev,
      `Você causou ${damage} de dano em ${enemy.name}!`,
    ]);

    if (newEnemyHealth <= 0) {
      setCombatLog((prev: string[]) => [...prev, `${enemy.name} foi derrotado!`]);
      setTimeout(() => {
        dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'exploring' });
      }, 2000);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const handleSpecialAttack = (): void => {
    if (!enemy || !state.player || !isPlayerTurn || state.player.mana < 20) return;

    const damage = Math.floor(
      (state.player.class === 'mage' ? 40 : 30) * (0.8 + Math.random() * 0.4)
    );
    const newEnemyHealth = Math.max(0, enemy.health - damage);
    const newMana = state.player.mana - 20;

    setEnemy({ ...enemy, health: newEnemyHealth });
    dispatch({
      type: 'UPDATE_PLAYER_STATS',
      payload: { mana: newMana },
    });

    setCombatLog((prev: string[]) => [
      ...prev,
      `Você usou um ataque especial e causou ${damage} de dano em ${enemy.name}!`,
    ]);

    if (newEnemyHealth <= 0) {
      setCombatLog((prev: string[]) => [...prev, `${enemy.name} foi derrotado!`]);
      setTimeout(() => {
        dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'exploring' });
      }, 2000);
    } else {
      setIsPlayerTurn(false);
    }
  };

  if (!state.player || !enemy) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Status do jogador */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{state.player.name}</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Vida</span>
                <span>
                  {state.player.health}/{state.player.maxHealth}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full transition-all"
                  style={{
                    width: `${(state.player.health / state.player.maxHealth) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Mana</span>
                <span>
                  {state.player.mana}/{state.player.maxMana}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{
                    width: `${(state.player.mana / state.player.maxMana) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status do inimigo */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{enemy.name}</h2>
          <div>
            <div className="flex justify-between mb-1">
              <span>Vida</span>
              <span>
                {enemy.health}/{enemy.maxHealth}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-700 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full transition-all"
                style={{
                  width: `${(enemy.health / enemy.maxHealth) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Log de combate */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 h-48 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Log de Combate</h3>
          <div className="space-y-2">
            {combatLog.map((log: string, index: number) => (
              <p key={index} className="text-gray-300">
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex space-x-4">
          <button
            onClick={handleAttack}
            disabled={!isPlayerTurn}
            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-colors ${
              isPlayerTurn
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Atacar
          </button>
          <button
            onClick={handleSpecialAttack}
            disabled={!isPlayerTurn || state.player.mana < 20}
            className={`flex-1 py-3 px-6 rounded-lg font-bold transition-colors ${
              isPlayerTurn && state.player.mana >= 20
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Ataque Especial (20 Mana)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Combat; 