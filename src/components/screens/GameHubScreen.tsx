import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { 
  Sword, 
  Map, 
  Package, 
  MessageCircle, 
  Settings, 
  LogOut,
  Heart,
  Star,
  Zap
} from 'lucide-react';

/**
 * Tela principal do jogo (Game Hub)
 * Centro de controle com acesso a todas as funcionalidades
 */
function GameHubScreen() {
  const { state, dispatch } = useGame();
  const character = state.selectedCharacter;

  if (!character) {
    dispatch({ type: 'SET_SCREEN', payload: 'character-selection' });
    return null;
  }

  const handleLogout = () => {
    if (confirm('Deseja realmente sair do jogo?')) {
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SELECT_CHARACTER', payload: '' });
      dispatch({ type: 'SET_SCREEN', payload: 'login' });
    }
  };

  const menuItems = [
    {
      title: 'Enfrentar Inimigos',
      description: 'Batalhas em arenas orbitais e ruínas lunares',
      icon: Sword,
      color: 'from-red-600 to-red-800',
      action: () => console.log('Batalhas em desenvolvimento')
    },
    {
      title: 'Missões',
      description: 'Investigações em satélites e portais',
      icon: Map,
      color: 'from-blue-600 to-blue-800',
      action: () => console.log('Missões em desenvolvimento')
    },
    {
      title: 'Inventário',
      description: 'Itens biomecânicos e armas híbridas',
      icon: Package,
      color: 'from-green-600 to-green-800',
      action: () => console.log('Inventário em desenvolvimento')
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho com informações do personagem */}
        <div className="cosmic-panel p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar do personagem */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-alien-glow to-cosmic-purple flex items-center justify-center animate-glow">
                <span className="text-2xl font-medieval font-bold text-white">
                  {character.name.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Informações básicas */}
              <div>
                <h1 className="text-3xl font-medieval font-bold text-white mb-2">
                  {character.name}
                </h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-cosmic-gold" />
                    <span className="text-cosmic-gold">Nível {character.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">{character.health}/{character.maxHealth} HP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">{character.experience}/{character.experienceToNext} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-lg bg-black/30 border border-alien-crystal/30 text-gray-400 hover:text-alien-glow transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg bg-black/30 border border-red-500/30 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Barra de experiência */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Experiência</span>
              <span>{Math.round((character.experience / character.experienceToNext) * 100)}%</span>
            </div>
            <div className="w-full bg-black/50 rounded-full h-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${(character.experience / character.experienceToNext) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Menu principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={item.action}
                className="cosmic-panel p-6 cursor-pointer group hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medieval font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Área de notificações e chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notificações */}
          <div className="cosmic-panel p-6">
            <h3 className="text-xl font-medieval font-bold text-alien-crystal mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Alertas do Sistema
            </h3>
            <div className="space-y-3">
              <div className="bg-black/30 p-3 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-green-400 font-semibold">Sistema Online</p>
                <p className="text-xs text-gray-400">Conexão com o nexus estabelecida</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-400 font-semibold">Bem-vindo ao Nexus</p>
                <p className="text-xs text-gray-400">Sua jornada medieval espacial começou</p>
              </div>
            </div>
          </div>

          {/* Chat/Mensagens */}
          <div className="cosmic-panel p-6">
            <h3 className="text-xl font-medieval font-bold text-alien-crystal mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Rede Mental Alienígena
            </h3>
            <div className="space-y-3 mb-4">
              <div className="bg-black/30 p-3 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-cosmic-gold font-semibold">Sistema:</span> Canal global ativo
                </p>
                <p className="text-xs text-gray-500">Há 2 minutos</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="input-cosmic flex-1 text-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-cosmic-purple to-alien-energy rounded-lg text-white font-semibold hover:scale-105 transition-transform">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameHubScreen;