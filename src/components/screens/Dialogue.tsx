import React, { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

interface DialogueOption {
  id: string;
  text: string;
  nextDialogueId: string | null;
  effect?: () => void;
}

interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  options: DialogueOption[];
}

const Dialogue: React.FC = () => {
  const { state, dispatch } = useGame();
  const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | null>(null);
  const [dialogueHistory, setDialogueHistory] = useState<string[]>([]);

  // Exemplo de diálogo
  const dialogues: Record<string, DialogueNode> = {
    start: {
      id: 'start',
      speaker: 'Alienígena Misterioso',
      text: 'Olá, viajante! Vejo que você não é deste planeta. O que o trouxe até aqui?',
      options: [
        {
          id: 'option1',
          text: 'Estou apenas explorando o universo.',
          nextDialogueId: 'exploring',
        },
        {
          id: 'option2',
          text: 'Estou procurando por tecnologia avançada.',
          nextDialogueId: 'technology',
        },
        {
          id: 'option3',
          text: 'Nenhum dos seus negócios!',
          nextDialogueId: 'hostile',
        },
      ],
    },
    exploring: {
      id: 'exploring',
      speaker: 'Alienígena Misterioso',
      text: 'Interessante! Nossa civilização valoriza muito os exploradores. Posso te ajudar com algumas informações sobre este planeta.',
      options: [
        {
          id: 'option1',
          text: 'Sim, por favor!',
          nextDialogueId: 'help',
          effect: () => {
            dispatch({
              type: 'ADD_QUEST',
              payload: {
                id: crypto.randomUUID(),
                title: 'Explorador do Universo',
                description: 'Descubra os segredos deste planeta alienígena.',
                status: 'active',
                rewards: [],
              },
            });
          },
        },
        {
          id: 'option2',
          text: 'Não, obrigado. Prefiro descobrir por conta própria.',
          nextDialogueId: 'end',
        },
      ],
    },
    technology: {
      id: 'technology',
      speaker: 'Alienígena Misterioso',
      text: 'Ah, um colecionador de tecnologia! Temos algumas relíquias antigas que podem te interessar... por um preço, é claro.',
      options: [
        {
          id: 'option1',
          text: 'Quais relíquias?',
          nextDialogueId: 'relics',
        },
        {
          id: 'option2',
          text: 'Não estou interessado em comprar.',
          nextDialogueId: 'end',
        },
      ],
    },
    hostile: {
      id: 'hostile',
      speaker: 'Alienígena Misterioso',
      text: 'Hmm, não é muito amigável, não é? Talvez você precise de uma lição de boas maneiras...',
      options: [
        {
          id: 'option1',
          text: 'Desculpe, não quis ser rude.',
          nextDialogueId: 'apology',
        },
        {
          id: 'option2',
          text: 'Enfrente-me se tiver coragem!',
          nextDialogueId: 'combat',
          effect: () => {
            dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'combat' });
          },
        },
      ],
    },
    end: {
      id: 'end',
      speaker: 'Alienígena Misterioso',
      text: 'Entendi. Boa sorte em sua jornada!',
      options: [
        {
          id: 'option1',
          text: 'Adeus!',
          nextDialogueId: null,
          effect: () => {
            dispatch({ type: 'CHANGE_GAME_PHASE', payload: 'exploring' });
          },
        },
      ],
    },
  };

  // Inicializa o diálogo
  useEffect(() => {
    setCurrentDialogue(dialogues.start);
  }, []);

  const handleOptionSelect = (option: DialogueOption): void => {
    if (option.effect) {
      option.effect();
    }

    setDialogueHistory((prev: string[]) => [...prev, `${currentDialogue?.speaker}: ${currentDialogue?.text}`]);

    if (option.nextDialogueId) {
      setCurrentDialogue(dialogues[option.nextDialogueId]);
    }
  };

  if (!currentDialogue) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Histórico de diálogo */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 h-64 overflow-y-auto">
          {dialogueHistory.map((text: string, index: number) => (
            <p key={index} className="text-gray-300 mb-2">
              {text}
            </p>
          ))}
        </div>

        {/* Diálogo atual */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-purple-400 mb-2">
            {currentDialogue.speaker}
          </h2>
          <p className="text-lg mb-6">{currentDialogue.text}</p>

          {/* Opções de diálogo */}
          <div className="space-y-3">
            {currentDialogue.options.map((option: DialogueOption) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogue; 