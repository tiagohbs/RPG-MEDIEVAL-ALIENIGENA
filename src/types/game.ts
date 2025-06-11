/**
 * Tipos e interfaces para o sistema de jogo RPG Medieval Espacial
 */

// Telas disponíveis no jogo
export type GameScreen = 'homepage' | 'character-creation' | 'game-world' | 'combat' | 'dialogue' | 'battle';

// Dados do usuário
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

// Atributos do personagem
export interface CharacterAttributes {
  forca: number;          // Exoesqueleto físico
  vitalidade: number;     // Resistência Bio-Arcana
  agilidade: number;      // Reflexo Neural
  sinergiaCosmica: number; // Habilidades especiais
}

// Personagem do jogador
export interface Character {
  id: string;
  name: string;
  race: Race;
  class: Class;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  experience: number;
  inventory: Item[];
  position: {
    x: number;
    y: number;
  };
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
  };
}

// Notificações do sistema
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

// Mensagens do chat
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// Estado global do jogo
export interface GameState {
  currentScreen: GameScreen;
  player?: Character;
  enemies: Character[];
  dialogue?: {
    text: string;
    options: {
      text: string;
      action: () => void;
    }[];
  };
  isLoading: boolean;
  user: User | null;
  characters: Character[];
  selectedCharacter: Character | null;
  notifications: Notification[];
  messages: Message[];
}

// Ações do reducer
export type GameAction =
  | { type: 'SET_SCREEN'; payload: GameScreen }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_CHARACTER'; payload: Character }
  | { type: 'DELETE_CHARACTER'; payload: string }
  | { type: 'SELECT_CHARACTER'; payload: string }
  | { type: 'LOAD_CHARACTERS' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CREATE_CHARACTER'; payload: Character }
  | { type: 'UPDATE_CHARACTER'; payload: Partial<Character> }
  | { type: 'ADD_ENEMY'; payload: Character }
  | { type: 'REMOVE_ENEMY'; payload: string }
  | { type: 'UPDATE_ENEMY'; payload: { id: string; updates: Partial<Character> } }
  | { type: 'SET_DIALOGUE'; payload: GameState['dialogue'] }
  | { type: 'CLEAR_DIALOGUE' };

export type Race = 'human' | 'alien' | 'hybrid';
export type Class = 'warrior' | 'mage' | 'rogue' | 'scientist';

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'artifact';
  description: string;
  value: number;
  effects?: {
    health?: number;
    mana?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
    vitality?: number;
  };
}