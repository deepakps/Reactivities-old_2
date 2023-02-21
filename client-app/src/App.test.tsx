/* This file is obsolete now. 
Date - 21th Feb, 2023. */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app/layout/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
