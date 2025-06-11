import { Character } from '../types/battle';

// Tipos de inimigos
const tiposInimigos = [
  {
    nome: 'Alienígena Guerreiro',
    tipo: 'guerreiro',
    vidaMaxima: 80,
    forcaDeAtaque: 12,
    velocidadeDeAtaque: 1.2,
    defesa: 8,
    agilidade: 6,
  },
  {
    nome: 'Alienígena Arqueiro',
    tipo: 'arqueiro',
    vidaMaxima: 60,
    forcaDeAtaque: 15,
    velocidadeDeAtaque: 1.5,
    defesa: 5,
    agilidade: 10,
  },
  {
    nome: 'Alienígena Berserker',
    tipo: 'berserker',
    vidaMaxima: 100,
    forcaDeAtaque: 18,
    velocidadeDeAtaque: 0.8,
    defesa: 4,
    agilidade: 4,
  },
  {
    nome: 'Alienígena Místico',
    tipo: 'mistico',
    vidaMaxima: 70,
    forcaDeAtaque: 14,
    velocidadeDeAtaque: 1.3,
    defesa: 6,
    agilidade: 7,
  },
];

// Gerar um inimigo aleatório
export function gerarInimigoAleatorio(): Character {
  const tipoAleatorio = tiposInimigos[Math.floor(Math.random() * tiposInimigos.length)];
  const id = `inimigo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    nome: tipoAleatorio.nome,
    vidaAtual: tipoAleatorio.vidaMaxima,
    vidaMaxima: tipoAleatorio.vidaMaxima,
    forcaDeAtaque: tipoAleatorio.forcaDeAtaque,
    velocidadeDeAtaque: tipoAleatorio.velocidadeDeAtaque,
    defesa: tipoAleatorio.defesa,
    agilidade: tipoAleatorio.agilidade,
    tipo: 'inimigo',
    efeitosVisuais: [],
    posicao: { x: 0, y: 0 },
    estaAtacando: false,
    estaDefendendo: false,
    estaDerrotado: false,
  };
}

// Gerar um grupo de inimigos
export function gerarGrupoInimigos(quantidade: number): Character[] {
  const inimigos: Character[] = [];
  for (let i = 0; i < quantidade; i++) {
    const inimigo = gerarInimigoAleatorio();
    // Ajustar posição baseada no índice
    inimigo.posicao = {
      x: 400 + i * 100, // Posição X baseada no índice
      y: 300, // Posição Y fixa
    };
    inimigos.push(inimigo);
  }
  return inimigos;
}

// Gerar um chefe
export function gerarChefe(): Character {
  const id = `chefe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    nome: 'Alienígena Supremo',
    vidaAtual: 200,
    vidaMaxima: 200,
    forcaDeAtaque: 25,
    velocidadeDeAtaque: 1.0,
    defesa: 15,
    agilidade: 8,
    tipo: 'inimigo',
    efeitosVisuais: [
      {
        id: 'brilho-chefe',
        tipo: 'brilho',
        intensidade: 2,
        duracao: Infinity,
        posicao: { x: 0, y: 0 },
      },
    ],
    posicao: { x: 500, y: 300 },
    estaAtacando: false,
    estaDefendendo: false,
    estaDerrotado: false,
  };
}

// Função para regenerar inimigos derrotados
export function regenerarInimigos(inimigos: Character[]): Character[] {
  return inimigos.map(inimigo => {
    if (inimigo.estaDerrotado) {
      const novoInimigo = gerarInimigoAleatorio();
      return {
        ...novoInimigo,
        posicao: inimigo.posicao, // Manter a posição original
      };
    }
    return inimigo;
  });
} 