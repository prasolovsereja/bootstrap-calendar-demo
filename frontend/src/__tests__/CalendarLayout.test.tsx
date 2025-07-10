import { vi } from 'vitest';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import CalendarLayout from '../components/calendar/CalendarLayout';
import { renderWithProvider } from '../test/utils.ts/renderWithProvider';

describe('Calendar Layout tests', () => {
  test('Календарь должен сворачивается и разворачивается ', async () => {
    renderWithProvider(<CalendarLayout />);
    vi.useFakeTimers();

    await act(async () => {
      fireEvent.click(screen.getByTestId('calendar-toggle-mode'));
      vi.runAllTimers();
    });

    expect(screen.getByTestId('calendar-day-container')).toHaveClass('h-25');

    await act(async () => {
      fireEvent.click(screen.getByTestId('calendar-toggle-mode'));
      vi.runAllTimers();
    });

    expect(screen.getByTestId('calendar-day-container')).toHaveClass('h-100');
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('Модакла должна открываться и закрываться', async () => {
    renderWithProvider(<CalendarLayout />);

    fireEvent.click(screen.getByTestId('calendar-open-modal'));
    expect(screen.getByTestId('calendar-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-modal'));
    await waitFor(() => expect(screen.queryByTestId('calendar-modal')).not.toBeInTheDocument());
  });
  test('Должна переключаться неделя', async () => {
    renderWithProvider(<CalendarLayout />);

    await act(async () => {
      fireEvent.click(screen.getByText(/->/i));
    });
    await waitFor(() =>
      expect(screen.getByTestId('week-range')).toHaveStyle('color: rgb(0, 0, 0)'),
    );
    await act(async () => {
      fireEvent.click(screen.getByText(/<-/i));
      fireEvent.click(screen.getByText(/<-/i));
    });
    await waitFor(() =>
      expect(screen.getByTestId('week-range')).toHaveStyle('color: rgb(0, 0, 0)'),
    );
  });
});
