import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { Character, Race, Class } from '../../types/game';

const CharacterCreation: React.FC = () => {
  const { dispatch } = useGame();
  const [formData, setFormData] = useState<{
    name: string;
    race: Race;
    class: Class;
    attributes: {
      strength: number;
      dexterity: number;
      intelligence: number;
      vitality: number;
    };
  }>({
    name: '',
    race: 'human',
    class: 'warrior',
    attributes: {
      strength: 10,
      dexterity: 10,
      intelligence: 10,
      vitality: 10
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: formData.name,
      race: formData.race,
      class: formData.class,
      level: 1,
      health: 100,
      maxHealth: 100,
      mana: 50,
      maxMana: 50,
      experience: 0,
      inventory: [],
      position: { x: 0, y: 0 },
      attributes: formData.attributes
    };

    dispatch({ type: 'CREATE_CHARACTER', payload: newCharacter });
    dispatch({ type: 'SET_SCREEN', payload: 'game-world' });
  };

  const handleAttributeChange = (attribute: keyof Character['attributes'], value: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: Math.max(1, Math.min(20, value))
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-cosmic-darkBlue text-white p-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-medieval text-cosmic-gold mb-8 text-center">
          Criação de Personagem
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-cosmic-purple/20 p-6 rounded-lg border border-alien-glow">
            <label className="block text-lg mb-2">Nome do Personagem</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-cosmic-darkBlue border border-alien-crystal rounded p-2 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-cosmic-purple/20 p-6 rounded-lg border border-alien-glow">
              <label className="block text-lg mb-2">Raça</label>
              <select
                value={formData.race}
                onChange={(e) => setFormData(prev => ({ ...prev, race: e.target.value as Race }))}
                className="w-full bg-cosmic-darkBlue border border-alien-crystal rounded p-2 text-white"
              >
                <option value="human">Humano</option>
                <option value="alien">Alienígena</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>

            <div className="bg-cosmic-purple/20 p-6 rounded-lg border border-alien-glow">
              <label className="block text-lg mb-2">Classe</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value as Class }))}
                className="w-full bg-cosmic-darkBlue border border-alien-crystal rounded p-2 text-white"
              >
                <option value="warrior">Guerreiro</option>
                <option value="mage">Mago</option>
                <option value="rogue">Ladino</option>
                <option value="scientist">Cientista</option>
              </select>
            </div>
          </div>

          <div className="bg-cosmic-purple/20 p-6 rounded-lg border border-alien-glow">
            <h2 className="text-xl font-medieval text-cosmic-gold mb-4">Atributos</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.attributes).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="block capitalize">{key}</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleAttributeChange(key as keyof Character['attributes'], value - 1)}
                      className="px-2 py-1 bg-cosmic-purple rounded hover:bg-cosmic-purple/80"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{value}</span>
                    <button
                      type="button"
                      onClick={() => handleAttributeChange(key as keyof Character['attributes'], value + 1)}
                      className="px-2 py-1 bg-cosmic-purple rounded hover:bg-cosmic-purple/80"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-alien-glow text-white py-3 rounded-lg font-medieval text-xl hover:bg-alien-glow/80 transition-colors"
          >
            Criar Personagem
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CharacterCreation; 