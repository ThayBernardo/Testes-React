import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const { render, screen } = require('@testing-library/react');

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('Página inicial, na URL / ao clicar no link Home da barra de navegação.',
      () => {
        const { history } = renderWithRouter(<App />);

        const linkHome = screen.getByRole('link', { name: 'Home' });

        expect(linkHome).toBeInTheDocument();

        userEvent.click(linkHome);

        const { pathname } = history.location;

        expect(pathname).toBe('/');
      });

    test('Página de About, na URL /about, ao clicar no link About da barra de navegação.',
      () => {
        const { history } = renderWithRouter(<App />);

        const linkAbout = screen.getByRole('link', { name: 'About' });

        expect(linkAbout).toBeInTheDocument();

        userEvent.click(linkAbout);

        const { pathname } = history.location;

        expect(pathname).toBe('/about');
      });

    test('Página Favoritos',
      () => {
        const { history } = renderWithRouter(<App />);

        const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

        expect(linkFavorites).toBeInTheDocument();

        userEvent.click(linkFavorites);

        const { pathname } = history.location;

        expect(pathname).toBe('/favorites');
      });

    test('Página Not Found ao entrar em uma URL desconhecida.', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/naoexiste');

      const notFound = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });

      expect(notFound).toBeInTheDocument();
    });
  });
