import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const element = screen.getByText(/Are you an introvert or an extrovert?/i);
  expect(element).toBeInTheDocument();
});
