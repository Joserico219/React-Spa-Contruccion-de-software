import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Galeria', () => {
  it('no debe mostrar ninguna idea antes de hacer clic', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Galería'));

    expect(
      screen.queryByText(/mariposa|rostro|flor de loto|sol y una luna|costillas/i)
    ).not.toBeInTheDocument();
  });

  it('debe mostrar la primera idea de la lista cuando Math.random devuelve 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    render(<App />);

    fireEvent.click(screen.getByText('Galería'));
    fireEvent.click(screen.getByText('¡Dame una idea!'));

    expect(
      screen.getByText('Una mariposa de trazo fino en la muñeca.')
    ).toBeInTheDocument();
  });

  it('debe mostrar la ultima idea de la lista cuando Math.random devuelve un valor cercano a 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);
    render(<App />);

    fireEvent.click(screen.getByText('Galería'));
    fireEvent.click(screen.getByText('¡Dame una idea!'));

    expect(
      screen.getByText('Una frase en cursiva muy delgadita en las costillas.')
    ).toBeInTheDocument();
  });
});
