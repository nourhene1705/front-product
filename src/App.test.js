import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Login page title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Bienvenue/i);     
  expect(titleElement).toBeInTheDocument();
});
