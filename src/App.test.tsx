import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
describe('delete', () => {
  test('delete order correctly', () => {
    render(<App />);
    const deleteButtons = screen.getAllByTestId('delete-order');
    userEvent.click(deleteButtons[0]);
    const drinkList = screen.getByTestId('drink-list');
    expect(drinkList.childNodes.length).toEqual(9);
  })
});


