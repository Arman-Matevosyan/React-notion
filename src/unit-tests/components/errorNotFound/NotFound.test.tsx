import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../../components/errorNotFound/NotFound';

describe('NotFound', () => {
  test('should render correctly', async () => {
    render(<NotFound />);
    expect(await screen.findByTestId('not-found')).toBeInTheDocument();
  });
});
