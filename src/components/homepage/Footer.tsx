import React from 'react';
import { Github, Twitter, Youtube, Mail, Heart } from 'lucide-react';

/**
 * Rodapé da página inicial
 * Contém links úteis, informações legais e créditos
 */
const Footer: React.FC = () => {
  const anoAtual = new Date().getFullYear();

  const navegarPara = (rota: string) => {
    console.log(`Navegando para: ${rota}`);
    // Aqui será implementada a navegação futura
  };

  const abrirLinkExterno = (url: string) => {
    console.log(`Abrindo link externo: ${url}`);
    // Aqui será implementada a abertura de links externos
  };

  return (
    <footer className="bg-black/40 border-t border-alien-crystal/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteúdo principal do rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Informações do jogo */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-alien-glow to-cosmic-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <h3 className="text-xl font-medieval font-bold text-white">NEXUS</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              O RPG medieval espacial que combina magia ancestral com tecnologia cósmica. 
              Forje seu destino entre as estrelas.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => abrirLinkExterno('https://github.com')}
                className="w-8 h-8 bg-gray-700 hover:bg-alien-glow rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Github className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => abrirLinkExterno('https://twitter.com')}
                className="w-8 h-8 bg-gray-700 hover:bg-alien-glow rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => abrirLinkExterno('https://youtube.com')}
                className="w-8 h-8 bg-gray-700 hover:bg-alien-glow rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Youtube className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Links do jogo */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Jogo</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navegarPara('/download')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Download
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/requisitos')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Requisitos do Sistema
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/guias')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Guias e Tutoriais
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/patch-notes')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Notas de Atualização
                </button>
              </li>
            </ul>
          </div>

          {/* Comunidade */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Comunidade</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => abrirLinkExterno('https://discord.com')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Discord Oficial
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/forum')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Fórum
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/eventos')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Eventos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/ranking')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Ranking
                </button>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navegarPara('/suporte')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Central de Ajuda
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/contato')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm flex items-center space-x-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>Contato</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/bug-report')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Reportar Bug
                </button>
              </li>
              <li>
                <button
                  onClick={() => navegarPara('/feedback')}
                  className="text-gray-400 hover:text-alien-glow transition-colors duration-300 text-sm"
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Links legais */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <button
                onClick={() => navegarPara('/termos')}
                className="text-gray-400 hover:text-alien-glow transition-colors duration-300"
              >
                Termos de Uso
              </button>
              <button
                onClick={() => navegarPara('/privacidade')}
                className="text-gray-400 hover:text-alien-glow transition-colors duration-300"
              >
                Política de Privacidade
              </button>
              <button
                onClick={() => navegarPara('/cookies')}
                className="text-gray-400 hover:text-alien-glow transition-colors duration-300"
              >
                Política de Cookies
              </button>
            </div>

            {/* Copyright e créditos */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-1">
                © {anoAtual} NEXUS Medieval Espacial. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs flex items-center justify-center md:justify-end space-x-1">
                <span>Desenvolvido com</span>
                <Heart className="w-3 h-3 text-red-500" />
                <span>pela equipe NEXUS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;