import React from 'react';
import '../Inicio/Inicio.css';
import './AcercaDe.css';

const AcercaDe = ({ clicsInteresados }) => {
  return (
    <section className="page">
      <h2>Acerca de nuestro estilo</h2>
      <p>
        El minimalismo es nuestra especialidad. Nos enfocamos en detalles sutiles
        y trazos continuos que se ven delicados en la piel, ideal para tu primer tatuaje.
      </p>

      <img
        src="/images/tatuaje-principito.jpg"
        alt="Tatuaje del Principito"
        className="imagen-spa"
      />

      <p>
        Personas interesadas en este estilo hoy:{' '}
        <span className="contador-clics">{clicsInteresados}</span>
      </p>
    </section>
  );
};

export default AcercaDe;
