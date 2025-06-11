import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
export type GameScreen = 'character-creation' | 'game-world' | 'combat' | 'dialogue' | 'battle';

export interface GameState {
  currentScreen: GameScreen;
  character: {
    nome: string;
    raca: string;
    classe: string;
    nivel: number;
    vida: number;
    vidaMaxima: number;
    forca: number;
    defesa: number;
    agilidade: number;
  } | null;
  inimigos: Array<{
    id: string;
    nome: string;
    tipo: string;
    vida: number;
    vidaMaxima: number;
    forca: number;
    defesa: number;
    agilidade: number;
  }>;
  dialogoAtual: {
    npc: string;
    texto: string;
    opcoes: Array<{
      texto: string;
      acao: () => void;
    }>;
  } | null;
}

// Ações
type GameAction =
  | { type: 'SET_SCREEN'; payload: GameScreen }
  | { type: 'CREATE_CHARACTER'; payload: GameState['character'] }
  | { type: 'UPDATE_CHARACTER'; payload: Partial<GameState['character']> }
  | { type: 'ADD_ENEMY'; payload: GameState['inimigos'][0] }
  | { type: 'REMOVE_ENEMY'; payload: string }
  | { type: 'UPDATE_ENEMY'; payload: { id: string; updates: Partial<GameState['inimigos'][0]> } }
  | { type: 'SET_DIALOGUE'; payload: GameState['dialogoAtual'] }
  | { type: 'CLEAR_DIALOGUE' };

// Estado inicial
const initialState: GameState = {
  currentScreen: 'character-creation',
  character: null,
  inimigos: [],
  dialogoAtual: null,
};

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
        character: action.payload,
      };

    case 'UPDATE_CHARACTER':
      if (!state.character) return state;
      return {
        ...state,
        character: {
          ...state.character,
          ...action.payload,
        },
      };

    case 'ADD_ENEMY':
      return {
        ...state,
        inimigos: [...state.inimigos, action.payload],
      };

    case 'REMOVE_ENEMY':
      return {
        ...state,
        inimigos: state.inimigos.filter((inimigo) => inimigo.id !== action.payload),
      };

    case 'UPDATE_ENEMY':
      return {
        ...state,
        inimigos: state.inimigos.map((inimigo) =>
          inimigo.id === action.payload.id
            ? { ...inimigo, ...action.payload.updates }
            : inimigo
        ),
      };

    case 'SET_DIALOGUE':
      return {
        ...state,
        dialogoAtual: action.payload,
      };

    case 'CLEAR_DIALOGUE':
      return {
        ...state,
        dialogoAtual: null,
      };

    default:
      return state;
  }
}

// Contexto
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

// Provedor
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// Hook personalizado
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return {
    ...context.state,
    dispatch: context.dispatch,
  };
}