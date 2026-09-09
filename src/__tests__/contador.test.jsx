import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Contador de interesados', () => {
  it('debe marcar 1 la primera vez que se hace clic en "Acerca de"', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Acerca de'));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('debe incrementarse cada vez que se hace clic en "Acerca de"', () => {
    render(<App />);

    const botonAcerca = screen.getByText('Acerca de');
    fireEvent.click(botonAcerca);
    fireEvent.click(botonAcerca);
    fireEvent.click(botonAcerca);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('no debe reiniciarse al navegar a otra pagina y volver', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Acerca de'));
    fireEvent.click(screen.getByText('Inicio'));
    fireEvent.click(screen.getByText('Acerca de'));

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
