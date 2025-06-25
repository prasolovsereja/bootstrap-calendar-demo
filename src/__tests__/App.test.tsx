import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProvider } from '../test/utils.ts/renderWithProvider';

test('рендерит заголовок', () => {
  renderWithProvider(<App />);
  expect(screen.getByText(/Добавить событие/i)).toBeInTheDocument();
});
