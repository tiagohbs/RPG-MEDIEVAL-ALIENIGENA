import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BattleContextType, 
  Character, 
  EstadoBatalha, 
  EfeitoVisual, 
  ResultadoAtaque 
} from '../types/battle';
import { gerarGrupoInimigos, regenerarInimigos } from '../utils/enemyGenerator';

// Estado inicial da batalha
const estadoInicial: EstadoBatalha = {
  jogador: {
    id: 'jogador-1',
    nome: 'Cavaleiro Espacial',
    vidaAtual: 100,
    vidaMaxima: 100,
    forcaDeAtaque: 15,
    velocidadeDeAtaque: 1.5,
    defesa: 10,
    agilidade: 8,
    tipo: 'jogador',
    efeitosVisuais: [],
    posicao: { x: 0, y: 0 },
    estaAtacando: false,
    estaDefendendo: false,
    estaDerrotado: false,
  },
  inimigos: [],
  turnoAtual: 'jogador',
  efeitosAtivos: [],
  tempoUltimoAtaque: 0,
  combateAtivo: false,
};

// Criar o contexto
const BattleContext = createContext<BattleContextType | undefined>(undefined);

// Reducer para gerenciar o estado
type BattleAction =
  | { type: 'INICIAR_BATALHA' }
  | { type: 'FINALIZAR_BATALHA' }
  | { type: 'ATUALIZAR_ESTADO'; payload: Partial<EstadoBatalha> }
  | { type: 'ADICIONAR_EFEITO'; payload: EfeitoVisual }
  | { type: 'REMOVER_EFEITO'; payload: string }
  | { type: 'ATUALIZAR_PERSONAGEM'; payload: { id: string; atualizacoes: Partial<Character> } }
  | { type: 'REGENERAR_INIMIGOS' };

function battleReducer(state: EstadoBatalha, action: BattleAction): EstadoBatalha {
  switch (action.type) {
    case 'INICIAR_BATALHA':
      return {
        ...state,
        combateAtivo: true,
        tempoUltimoAtaque: Date.now(),
        inimigos: gerarGrupoInimigos(3), // Iniciar com 3 inimigos
      };

    case 'FINALIZAR_BATALHA':
      return {
        ...state,
        combateAtivo: false,
        efeitosAtivos: [],
      };

    case 'ATUALIZAR_ESTADO':
      return {
        ...state,
        ...action.payload,
      };

    case 'ADICIONAR_EFEITO':
      return {
        ...state,
        efeitosAtivos: [...state.efeitosAtivos, action.payload],
      };

    case 'REMOVER_EFEITO':
      return {
        ...state,
        efeitosAtivos: state.efeitosAtivos.filter(efeito => efeito.id !== action.payload),
      };

    case 'ATUALIZAR_PERSONAGEM':
      const { id, atualizacoes } = action.payload;
      if (state.jogador.id === id) {
        return {
          ...state,
          jogador: { ...state.jogador, ...atualizacoes },
        };
      }
      return {
        ...state,
        inimigos: state.inimigos.map(inimigo =>
          inimigo.id === id ? { ...inimigo, ...atualizacoes } : inimigo
        ),
      };

    case 'REGENERAR_INIMIGOS':
      return {
        ...state,
        inimigos: regenerarInimigos(state.inimigos),
      };

    default:
      return state;
  }
}

// Provedor do contexto
export function BattleProvider({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = useReducer(battleReducer, estadoInicial);

  // Funções do contexto
  const iniciarBatalha = () => {
    dispatch({ type: 'INICIAR_BATALHA' });
  };

  const finalizarBatalha = () => {
    dispatch({ type: 'FINALIZAR_BATALHA' });
  };

  const executarAtaque = async (atacante: Character, alvo: Character): Promise<ResultadoAtaque> => {
    // Calcular chance de desvio baseada na agilidade
    const chanceDesvio = (alvo.agilidade / 100) * 0.5;
    const desviou = Math.random() < chanceDesvio;

    if (desviou) {
      return {
        atacante,
        alvo,
        dano: 0,
        critico: false,
        desviou: true,
        efeitosGerados: [],
      };
    }

    // Calcular dano base
    const danoBase = atacante.forcaDeAtaque;
    const reducaoDefesa = alvo.defesa * 0.1;
    const danoFinal = Math.max(1, Math.floor(danoBase - reducaoDefesa));

    // Chance de crítico (10%)
    const critico = Math.random() < 0.1;
    const danoFinalComCritico = critico ? danoFinal * 2 : danoFinal;

    // Atualizar vida do alvo
    const novaVida = Math.max(0, alvo.vidaAtual - danoFinalComCritico);
    dispatch({
      type: 'ATUALIZAR_PERSONAGEM',
      payload: {
        id: alvo.id,
        atualizacoes: {
          vidaAtual: novaVida,
          estaDerrotado: novaVida === 0,
        },
      },
    });

    // Gerar efeitos visuais
    const efeitosGerados: EfeitoVisual[] = [
      {
        id: `ataque-${Date.now()}`,
        tipo: 'faisca',
        intensidade: critico ? 2 : 1,
        duracao: 500,
        posicao: alvo.posicao,
      },
    ];

    if (critico) {
      efeitosGerados.push({
        id: `critico-${Date.now()}`,
        tipo: 'brilho',
        intensidade: 2,
        duracao: 1000,
        posicao: alvo.posicao,
      });
    }

    // Adicionar efeitos
    efeitosGerados.forEach(efeito => {
      dispatch({ type: 'ADICIONAR_EFEITO', payload: efeito });
      setTimeout(() => {
        dispatch({ type: 'REMOVER_EFEITO', payload: efeito.id });
      }, efeito.duracao);
    });

    return {
      atacante,
      alvo,
      dano: danoFinalComCritico,
      critico,
      desviou: false,
      efeitosGerados,
    };
  };

  const executarDefesa = (personagem: Character) => {
    dispatch({
      type: 'ATUALIZAR_PERSONAGEM',
      payload: {
        id: personagem.id,
        atualizacoes: {
          estaDefendendo: true,
          defesa: personagem.defesa * 1.5,
        },
      },
    });

    // Remover defesa após 2 segundos
    setTimeout(() => {
      dispatch({
        type: 'ATUALIZAR_PERSONAGEM',
        payload: {
          id: personagem.id,
          atualizacoes: {
            estaDefendendo: false,
            defesa: personagem.defesa / 1.5,
          },
        },
      });
    }, 2000);
  };

  const adicionarEfeito = (efeito: EfeitoVisual) => {
    dispatch({ type: 'ADICIONAR_EFEITO', payload: efeito });
  };

  const removerEfeito = (id: string) => {
    dispatch({ type: 'REMOVER_EFEITO', payload: id });
  };

  const atualizarEstado = (novoEstado: Partial<EstadoBatalha>) => {
    dispatch({ type: 'ATUALIZAR_ESTADO', payload: novoEstado });
  };

  // Efeito para gerenciar o ciclo de batalha
  useEffect(() => {
    if (!estado.combateAtivo) return;

    const intervalo = setInterval(() => {
      const agora = Date.now();
      const tempoDesdeUltimoAtaque = agora - estado.tempoUltimoAtaque;

      // Verificar se é hora do próximo ataque
      if (estado.turnoAtual === 'jogador' && !estado.jogador.estaAtacando) {
        const inimigoVivo = estado.inimigos.find(inimigo => !inimigo.estaDerrotado);
        if (inimigoVivo) {
          executarAtaque(estado.jogador, inimigoVivo);
          dispatch({ type: 'ATUALIZAR_ESTADO', payload: { turnoAtual: 'inimigo' } });
        }
      } else if (estado.turnoAtual === 'inimigo') {
        // Inimigos atacam em sequência
        const inimigoAtivo = estado.inimigos.find(
          inimigo => !inimigo.estaDerrotado && !inimigo.estaAtacando
        );
        if (inimigoAtivo && !estado.jogador.estaDerrotado) {
          executarAtaque(inimigoAtivo, estado.jogador);
          dispatch({ type: 'ATUALIZAR_ESTADO', payload: { turnoAtual: 'jogador' } });
        }
      }

      // Verificar se todos os inimigos foram derrotados
      const todosInimigosDerrotados = estado.inimigos.every(inimigo => inimigo.estaDerrotado);
      if (todosInimigosDerrotados) {
        // Regenerar inimigos após 3 segundos
        setTimeout(() => {
          dispatch({ type: 'REGENERAR_INIMIGOS' });
        }, 3000);
      }

      dispatch({ type: 'ATUALIZAR_ESTADO', payload: { tempoUltimoAtaque: agora } });
    }, 1000); // Verificar a cada segundo

    return () => clearInterval(intervalo);
  }, [estado.combateAtivo, estado.turnoAtual]);

  const valor = {
    estado,
    iniciarBatalha,
    finalizarBatalha,
    executarAtaque,
    executarDefesa,
    adicionarEfeito,
    removerEfeito,
    atualizarEstado,
  };

  return (
    <BattleContext.Provider value={valor}>
      {children}
    </BattleContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export const useBattle = () => {
  const context = useContext(BattleContext);
  if (context === undefined) {
    throw new Error('useBattle deve ser usado dentro de um BattleProvider');
  }
  return context;
};