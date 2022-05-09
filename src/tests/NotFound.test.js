import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente NotFound', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);

      const text = screen.getByRole('heading', { level: 2,
        name: /not found/i });

      expect(text).toBeInTheDocument();

      const img = screen
        .getByRole('img',
          { name: 'Pikachu crying because the page requested was not found' });

      expect(img).toBeInTheDocument();

      expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
