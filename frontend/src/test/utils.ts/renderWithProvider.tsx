import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../slices';
import type { ReactElement } from 'react';

export function renderWithProvider(ui: ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
