// Tipos para o sistema de batalha

// Interface base para personagens (jogador e inimigos)
export interface Character {
  id: string;
  nome: string;
  vidaAtual: number;
  vidaMaxima: number;
  forcaDeAtaque: number;
  velocidadeDeAtaque: number;
  defesa: number;
  agilidade: number;
  tipo: 'jogador' | 'inimigo';
  efeitosVisuais: EfeitoVisual[];
  posicao: { x: number; y: number };
  estaAtacando: boolean;
  estaDefendendo: boolean;
  estaDerrotado: boolean;
}

// Interface para efeitos visuais
export type TipoEfeito = 'faisca' | 'brilho' | 'explosao';

export interface EfeitoVisual {
  id: string;
  tipo: TipoEfeito;
  intensidade: number;
  duracao: number;
  posicao: {
    x: number;
    y: number;
  };
}

// Interface para o estado da batalha
export interface EstadoBatalha {
  jogador: Character;
  inimigos: Character[];
  turnoAtual: 'jogador' | 'inimigo';
  efeitosAtivos: EfeitoVisual[];
  tempoUltimoAtaque: number;
  combateAtivo: boolean;
}

// Interface para configurações de animação
export interface ConfiguracaoAnimacao {
  duracaoAtaque: number;
  duracaoDefesa: number;
  duracaoMovimento: number;
  escalaDano: number;
  escalaVelocidade: number;
}

// Interface para o resultado de um ataque
export interface ResultadoAtaque {
  atacante: Character;
  alvo: Character;
  dano: number;
  critico: boolean;
  desviou: boolean;
  efeitosGerados: EfeitoVisual[];
}

// Interface para o contexto da batalha
export interface BattleContextType {
  estado: EstadoBatalha;
  iniciarBatalha: () => void;
  finalizarBatalha: () => void;
  executarAtaque: (atacante: Character, alvo: Character) => Promise<ResultadoAtaque>;
  executarDefesa: (personagem: Character) => void;
  adicionarEfeito: (efeito: EfeitoVisual) => void;
  removerEfeito: (id: string) => void;
  atualizarEstado: (novoEstado: Partial<EstadoBatalha>) => void;
} 