import React from 'react';
import Header from '../homepage/Header';
import HeroSection from '../homepage/HeroSection';
import NewsSection from '../homepage/NewsSection';
import FeaturesSection from '../homepage/FeaturesSection';
import Footer from '../homepage/Footer';

/**
 * Tela inicial completa do jogo (Homepage)
 * Combina todos os componentes da página inicial
 */
const HomepageScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-darkBlue via-purple-900 to-black">
      {/* Cabeçalho fixo */}
      <Header />
      
      {/* Conteúdo principal */}
      <main>
        {/* Seção principal (Hero) */}
        <HeroSection />
        
        {/* Seção de notícias */}
        <NewsSection />
        
        {/* Seção de funcionalidades */}
        <FeaturesSection />
      </main>
      
      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default HomepageScreen;