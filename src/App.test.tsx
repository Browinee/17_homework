import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app correctly', () => {
  render(<App />);
  const plus = screen.getByTestId('plus');
  const title = screen.getByText('DailyDrinks!');
  const drinkList = screen.getByTestId('drink-list');
  expect(plus).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(drinkList.childNodes.length).toEqual(10);
});