import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Navegacion', () => {
  it('debe mostrar la pagina de Inicio por defecto', () => {
    render(<App />);
    expect(screen.getByText('Bienvenido al Estudio')).toBeInTheDocument();
  });

  it('debe cambiar a "Acerca de" al hacer clic en el boton del navbar', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Acerca de'));

    expect(screen.getByText('Acerca de nuestro estilo')).toBeInTheDocument();
  });

  it('debe cambiar a "Galeria" al hacer clic en el boton del navbar', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Galería'));

    expect(screen.getByText('Galería de Bocetos')).toBeInTheDocument();
  });

  it('debe marcar como activo el boton de la pagina actual', () => {
    render(<App />);

    const botonGaleria = screen.getByText('Galería');
    fireEvent.click(botonGaleria);

    expect(botonGaleria).toHaveClass('navbar__btn--active');
  });
});
