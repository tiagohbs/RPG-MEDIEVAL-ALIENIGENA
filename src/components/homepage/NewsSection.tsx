import React from 'react';
import { Calendar, ArrowRight, Zap, Shield, Sword } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Interface para definir a estrutura de uma notícia
 */
interface Noticia {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  categoria: 'atualizacao' | 'evento' | 'novidade';
  icone: React.ComponentType<{ className?: string }>;
}

/**
 * Seção de notícias da página inicial
 * Exibe as últimas atualizações e eventos do jogo
 */
const NewsSection: React.FC = () => {
  // Dados mockados das notícias - futuramente virão de uma API
  const noticias: Noticia[] = [
    {
      id: '1',
      titulo: 'Nova Atualização: Armas Cósmicas',
      descricao: 'Descubra as novas armas híbridas que combinam magia ancestral com tecnologia alienígena. Mais de 20 novos itens disponíveis!',
      data: '2025-01-15',
      categoria: 'atualizacao',
      icone: Sword,
    },
    {
      id: '2',
      titulo: 'Evento: Invasão das Ruínas Lunares',
      descricao: 'Participe do evento especial e explore as misteriosas ruínas descobertas na lua de Kepler-442b. Recompensas exclusivas aguardam!',
      data: '2025-01-12',
      categoria: 'evento',
      icone: Zap,
    },
    {
      id: '3',
      titulo: 'Sistema de Guildas Implementado',
      descricao: 'Forme alianças com outros jogadores e construa sua própria guilda. Trabalhem juntos para conquistar territórios cósmicos.',
      data: '2025-01-10',
      categoria: 'novidade',
      icone: Shield,
    },
  ];

  const formatarData = (dataString: string): string => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const obterCorCategoria = (categoria: string): string => {
    switch (categoria) {
      case 'atualizacao':
        return 'from-blue-600 to-blue-800';
      case 'evento':
        return 'from-purple-600 to-purple-800';
      case 'novidade':
        return 'from-green-600 to-green-800';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const verTodasNoticias = () => {
    console.log('Navegando para página de notícias...');
    // Aqui será implementada a navegação para a página de notícias
  };

  return (
    <section id="noticias" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-medieval font-bold text-white mb-4">
            Últimas <span className="text-alien-crystal">Notícias</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fique por dentro das novidades, atualizações e eventos do universo NEXUS
          </p>
        </motion.div>

        {/* Grid de notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {noticias.map((noticia, indice) => {
            const IconeNoticia = noticia.icone;
            return (
              <motion.article
                key={noticia.id}
                className="cosmic-panel p-6 group hover:scale-105 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: indice * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Cabeçalho do card */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${obterCorCategoria(noticia.categoria)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconeNoticia className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatarData(noticia.data)}
                  </div>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-alien-glow transition-colors duration-300">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {noticia.descricao}
                </p>

                {/* Categoria */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${obterCorCategoria(noticia.categoria)} text-white`}>
                    {noticia.categoria.charAt(0).toUpperCase() + noticia.categoria.slice(1)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-alien-glow group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Botão para ver todas as notícias */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={verTodasNoticias}
            className="btn-cosmic px-8 py-3 text-lg font-semibold inline-flex items-center space-x-2"
          >
            <span>Ver Todas as Notícias</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;