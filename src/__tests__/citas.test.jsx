import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import Citas from '../components/pages/Citas/Citas';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Formulario de Citas', () => {
  it('debe navegar a "Agendar Cita" y mostrar el formulario', () => {
    render(<App />);

    fireEvent.click(screen.getByText('Agendar Cita'));

    expect(screen.getByText('Agenda tu Cita')).toBeInTheDocument();
  });

  it('debe mostrar errores de validacion al enviar vacio', async () => {
    render(<Citas />);

    fireEvent.click(screen.getByRole('button', { name: /agendar cita/i }));

    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El telefono es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('Selecciona un estilo de tatuaje')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una fecha')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una hora')).toBeInTheDocument();
  });

  it('debe enviar la cita al backend cuando el formulario es valido', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          nombre: 'Laura Gomez',
          email: 'laura@correo.com',
          telefono: '3001234567',
          estilo: 'Minimalista',
          fecha: '2026-09-20',
          hora: '15:00',
          comentarios: '',
        }),
      });

    render(<Citas />);

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Laura Gomez' },
    });
    fireEvent.change(screen.getByLabelText(/correo electronico/i), {
      target: { value: 'laura@correo.com' },
    });
    fireEvent.change(screen.getByLabelText(/telefono/i), {
      target: { value: '3001234567' },
    });
    fireEvent.change(screen.getByLabelText(/estilo de tatuaje/i), {
      target: { value: 'Minimalista' },
    });
    fireEvent.change(screen.getByLabelText(/^fecha/i), {
      target: { value: '2026-09-20' },
    });
    fireEvent.change(screen.getByLabelText(/^hora/i), {
      target: { value: '15:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /agendar cita/i }));

    expect(
      await screen.findByText(/cita agendada correctamente/i)
    ).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/citas',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('debe mostrar un error si el email tiene formato invalido', async () => {
    render(<Citas />);

    fireEvent.change(screen.getByLabelText(/correo electronico/i), {
      target: { value: 'no-es-un-correo' },
    });
    fireEvent.click(screen.getByRole('button', { name: /agendar cita/i }));

    expect(await screen.findByText('Ingresa un email valido')).toBeInTheDocument();
  });
});
