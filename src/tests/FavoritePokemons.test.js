import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste o componente FavoritePokemons', () => {
  test('No favorite pokemon found, caso a pessoa não tenha pokémons favoritos.',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const notFavorite = screen.getByText('No favorite pokemon found');

      expect(notFavorite).toBeInTheDocument();
    });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);

    const notFavorite = screen.queryByText('No favorite pokemon found');

    expect(notFavorite).not.toBeInTheDocument();
  });
});
