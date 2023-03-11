import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../../../sections/Home';

jest.mock('react-query', () => ({
  useQuery: jest
    .fn()
    .mockReturnValue({ data: {}, isLoading: false, error: {} }),
}));

describe('Home', () => {
  test('should render correctly', async () => {
    render(<Home />);
    expect(await screen.findByTestId('Home')).toBeInTheDocument();
  });
});
