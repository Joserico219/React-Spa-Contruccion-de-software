import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Inicio from './components/pages/Inicio/Inicio';
import AcercaDe from './components/pages/AcercaDe/AcercaDe';
import Galeria from './components/pages/Galeria/Galeria';
import Citas from './components/pages/Citas/Citas';
import './styles/global.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [clicsInteresados, setClicsInteresados] = useState(0);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'acerca', label: 'Acerca de' },
    { id: 'galeria', label: 'Galería' },
    { id: 'citas', label: 'Agendar Cita' },
  ];

  const handleNavigate = (pageId) => {
    if (pageId === 'acerca') {
      setClicsInteresados((clics) => clics + 1);
    }
    setCurrentPage(pageId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Inicio />;
      case 'acerca':
        return <AcercaDe clicsInteresados={clicsInteresados} />;
      case 'galeria':
        return <Galeria />;
      case 'citas':
        return <Citas />;
      default:
        return <Inicio />;
    }
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        logo="Arte Minimalista"
        navItems={navItems}
      />
      <Layout>{renderPage()}</Layout>
    </>
  );
};

export default App;
