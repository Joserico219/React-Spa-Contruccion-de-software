import React, { useState, useEffect } from 'react';
import './Inicio.css';

const Inicio = () => {
  const [horaCarga, setHoraCarga] = useState('--:--:--');

  useEffect(() => {
    setHoraCarga(new Date().toLocaleTimeString());
  }, []);

  return (
    <section className="page">
      <h2>Bienvenido al Estudio</h2>
      <p>
        Esta es nuestra página principal. Aquí nos dedicamos a crear diseños de tatuajes
        con líneas muy finas, contornos suaves y sin rellenos.
      </p>

      <img
        src="/images/tatuaje-pez-loto.jpg"
        alt="Tatuaje de pez y flor de loto"
        className="imagen-spa"
      />

      <p>
        Hora de tu visita: <span className="hora-carga">{horaCarga}</span>
      </p>
    </section>
  );
};

export default Inicio;
