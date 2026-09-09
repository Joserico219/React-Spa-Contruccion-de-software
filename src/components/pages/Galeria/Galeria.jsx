import React, { useState } from 'react';
import '../Inicio/Inicio.css';
import './Galeria.css';

const ideasDeTatuajes = [
  'Una mariposa de trazo fino en la muñeca.',
  'La silueta de un rostro con una sola línea continua.',
  'Una flor de loto pequeña, sin sombras.',
  'Un sol y una luna minimalistas en el tobillo.',
  'Una frase en cursiva muy delgadita en las costillas.',
];

const Galeria = () => {
  const [textoIdea, setTextoIdea] = useState('');

  const generarIdea = () => {
    const ideaAlAzar = ideasDeTatuajes[Math.floor(Math.random() * ideasDeTatuajes.length)];
    setTextoIdea(ideaAlAzar);
  };

  return (
    <section className="page">
      <h2>Galería de Bocetos</h2>
      <p>
        Aquí puedes ver algunas ideas para tu próximo tatuaje. Dale clic al botón
        para que el sistema te sugiera una idea al azar para un diseño minimalista.
      </p>

      <img
        src="/images/tatuaje-viaje-montanas.jpg"
        alt="Tatuaje de viaje y montañas"
        className="imagen-spa"
      />

      <button className="navbar__btn boton-idea" onClick={generarIdea}>
        ¡Dame una idea!
      </button>
      {textoIdea && <p className="texto-idea">{textoIdea}</p>}
    </section>
  );
};

export default Galeria;
