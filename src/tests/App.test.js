import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders_Neo_Find_title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Neo Find-Actor/i);
  expect(linkElement).toBeInTheDocument();
});
