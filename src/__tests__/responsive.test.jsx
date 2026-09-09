import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('Responsive', () => {
  it('debe tener estructura semantica con nav, main y section', () => {
    const { container } = render(<App />);

    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('debe renderizar la imagen de la pagina con clase "imagen-spa"', () => {
    const { container } = render(<App />);

    const imagen = container.querySelector('img.imagen-spa');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('alt');
  });
});
