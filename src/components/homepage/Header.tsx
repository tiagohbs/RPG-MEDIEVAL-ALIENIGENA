import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Componente do cabeçalho da página inicial
 * Contém logo do jogo e botões de navegação
 */
const Header: React.FC = () => {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const alternarMenuMobile = () => {
    setMenuMobileAberto(!menuMobileAberto);
  };

  const navegarPara = (rota: string) => {
    console.log(`Navegando para: ${rota}`);
    // Aqui será implementada a navegação futura
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-alien-crystal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo do jogo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-alien-glow to-cosmic-purple rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-2xl font-medieval font-bold bg-gradient-to-r from-cosmic-gold to-alien-crystal bg-clip-text text-transparent">
              NEXUS
            </h1>
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navegarPara('/login')}
              className="text-gray-300 hover:text-alien-glow transition-colors duration-300 font-medium"
            >
              Entrar
            </button>
            <button
              onClick={() => navegarPara('/cadastro')}
              className="btn-cosmic px-6 py-2 text-sm"
            >
              Cadastrar-se
            </button>
          </nav>

          {/* Botão menu mobile */}
          <button
            onClick={alternarMenuMobile}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-alien-glow transition-colors"
          >
            {menuMobileAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu mobile */}
        {menuMobileAberto && (
          <div className="md:hidden py-4 border-t border-alien-crystal/20">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navegarPara('/login');
                  setMenuMobileAberto(false);
                }}
                className="text-left text-gray-300 hover:text-alien-glow transition-colors duration-300 font-medium py-2"
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  navegarPara('/cadastro');
                  setMenuMobileAberto(false);
                }}
                className="btn-cosmic text-sm py-2 text-center"
              >
                Cadastrar-se
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;