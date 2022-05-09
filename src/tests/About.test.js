import { render, screen } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const textPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(textPokedex).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph = screen.getByText(/a digital encyclopedia containing all Pokémons/i);
    const secondParagraph = screen
      .getByText(/and see more details for each one of them/i);

    expect(paragraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', { name: 'Pokédex' });

    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
