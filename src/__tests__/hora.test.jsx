import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Hora de carga', () => {
  it('debe mostrar una hora con formato HH:MM:SS en lugar del placeholder', async () => {
    render(<App />);

    const hora = await screen.findByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(hora).toBeInTheDocument();
    expect(hora.textContent).not.toBe('--:--:--');
  });
});
