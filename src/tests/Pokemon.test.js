import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);

      const name = screen.getByTestId('pokemon-name');

      expect(name).toBeInTheDocument();
      expect(name).toHaveTextContent('Pikachu');

      const type = screen.getByTestId('pokemon-type');

      expect(type).toBeInTheDocument();
      expect(type).toHaveTextContent('Electric');

      const peso = screen.getByTestId('pokemon-weight');

      expect(peso).toBeInTheDocument();
      expect(peso).toHaveTextContent('Average weight: 6.0 kg');

      const img = screen.getByRole('img', { name: 'Pikachu sprite' });

      expect(img).toBeInTheDocument();

      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

  test('More Details', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const star = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });

    expect(star).toBeInTheDocument();

    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
