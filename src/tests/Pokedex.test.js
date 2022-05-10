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

describe('Teste o componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);

      const text = screen.getByRole('heading', { level: 2,
        name: 'Encountered pokémons' });

      expect(text).toBeInTheDocument();
    });

  test('Se exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      renderWithRouter(<App />);

      const button = screen.getByRole('button', { name: 'Próximo pokémon' });

      expect(button).toBeInTheDocument();

      const pikachu = screen.getByText('Pikachu');

      expect(pikachu).toBeInTheDocument();

      userEvent.click(button);

      const charmander = screen.getByText('Charmander');

      expect(charmander).toBeInTheDocument();

      // O primeiro pokémon da lista deve ser
      // mostrado ao clicar no botão, se estiver no último pokémon da lista

      userEvent.click(button);

      const caterpie = screen.getByText('Caterpie');

      expect(caterpie).toBeInTheDocument();

      userEvent.click(button);

      const ekans = screen.getByText('Ekans');

      expect(ekans).toBeInTheDocument();

      userEvent.click(button);

      const alakazam = screen.getByText('Alakazam');

      expect(alakazam).toBeInTheDocument();

      userEvent.click(button);

      const mew = screen.getByText('Mew');

      expect(mew).toBeInTheDocument();

      userEvent.click(button);

      const rapidash = screen.getByText('Rapidash');

      expect(rapidash).toBeInTheDocument();

      userEvent.click(button);

      const snorlax = screen.getByText('Snorlax');

      expect(snorlax).toBeInTheDocument();

      userEvent.click(button);

      const dragonair = screen.getByText('Dragonair');

      expect(dragonair).toBeInTheDocument();

      userEvent.click(button);

      expect(pikachu).toBeInTheDocument();
    });

  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const getDataId = screen.getAllByTestId('pokemon-name');

    expect(getDataId.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');

    const seven = 7;

    expect(buttons).toHaveLength(seven);

    const all = screen.getByRole('button', { name: 'All' });
    const eletric = screen.getByRole('button', { name: 'Electric' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const bug = screen.getByRole('button', { name: 'Bug' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    const normal = screen.getByRole('button', { name: 'Normal' });
    const dragon = screen.getByRole('button', { name: 'Dragon' });

    expect(all).toBeInTheDocument();
    expect(eletric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const pikachu = screen.getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo/i });

    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonNext);

    const caterpie = screen.getByText('Caterpie');

    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttonNext);

    const ekans = screen.getByText('Ekans');

    expect(ekans).toBeInTheDocument();

    userEvent.click(buttonNext);

    const alakazam = screen.getByText('Alakazam');

    expect(alakazam).toBeInTheDocument();

    userEvent.click(buttonNext);

    const mew = screen.getByText('Mew');

    expect(mew).toBeInTheDocument();

    userEvent.click(buttonNext);

    const rapidash = screen.getByText('Rapidash');

    expect(rapidash).toBeInTheDocument();

    userEvent.click(buttonNext);

    const snorlax = screen.getByText('Snorlax');

    expect(snorlax).toBeInTheDocument();

    userEvent.click(buttonNext);

    const dragonair = screen.getByText('Dragonair');

    expect(dragonair).toBeInTheDocument();

    userEvent.click(buttonNext);

    expect(pikachu).toBeInTheDocument();
  });
});
