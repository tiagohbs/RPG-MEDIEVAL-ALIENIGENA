import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { Character } from '../../contexts/GameContext';

const CharacterCreation: React.FC = () => {
  const { dispatch } = useGame();
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    race: 'human',
    class: 'warrior',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) return;

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: formData.name,
      race: formData.race as Character['race'],
      class: formData.class as Character['class'],
      level: 1,
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      experience: 0,
      inventory: [],
      position: { x: 0, y: 0 },
    };

    dispatch({ type: 'SET_PLAYER', payload: newCharacter });
    dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'exploring' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Criação de Personagem
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nome do Personagem
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Raça
            </label>
            <select
              value={formData.race}
              onChange={(e) => setFormData({ ...formData, race: e.target.value as Character['race'] })}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="human">Humano</option>
              <option value="alien">Alienígena</option>
              <option value="hybrid">Híbrido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Classe
            </label>
            <select
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value as Character['class'] })}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="warrior">Guerreiro</option>
              <option value="mage">Mago</option>
              <option value="rogue">Ladino</option>
              <option value="scientist">Cientista</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Criar Personagem
          </button>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreation; 