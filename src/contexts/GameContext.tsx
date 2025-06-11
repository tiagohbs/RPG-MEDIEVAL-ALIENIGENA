import React, { createContext, useContext, useReducer } from 'react';
import { GameState, GameAction, GameScreen, Character } from '../types/game';

// Estado inicial
const initialState: GameState = {
  currentScreen: 'homepage',
  player: undefined,
  enemies: [],
  dialogue: undefined,
  isLoading: false,
  user: null,
  characters: [],
  selectedCharacter: null,
  notifications: [],
  messages: []
};

// Criar o contexto
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return {
        ...state,
        currentScreen: action.payload,
      };

    case 'CREATE_CHARACTER':
      return {
        ...state,
        player: action.payload,
      };

    case 'UPDATE_CHARACTER':
      if (!state.player) return state;
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload,
        },
      };

    case 'ADD_ENEMY':
      return {
        ...state,
        enemies: [...state.enemies, action.payload],
      };

    case 'REMOVE_ENEMY':
      return {
        ...state,
        enemies: state.enemies.filter(enemy => enemy.id !== action.payload),
      };

    case 'UPDATE_ENEMY':
      return {
        ...state,
        enemies: state.enemies.map(enemy =>
          enemy.id === action.payload.id
            ? { ...enemy, ...action.payload.updates }
            : enemy
        ),
      };

    case 'SET_DIALOGUE':
      return {
        ...state,
        dialogue: action.payload,
      };

    case 'CLEAR_DIALOGUE':
      return {
        ...state,
        dialogue: undefined,
      };

    default:
      return state;
  }
}

// Provedor do contexto
const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para usar o contexto
const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return context;
};

export { GameProvider, useGame };