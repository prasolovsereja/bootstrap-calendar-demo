import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventCard from '../components/events/EventCard';
import type { Event } from '../types/Event';
import { renderWithProvider } from '../test/utils.ts/renderWithProvider';

describe('Event Card tests', () => {
  let eventMock: Event;
  let styleMock: { top: number; left: number; height: number; width: number };
  beforeAll(() => {
    eventMock = {
      id: 1,
      title: 'test title',
      start: '13:00',
      end: '14:00',
      date: new Date().toISOString(),
      description: 'test description',
    };
    styleMock = {
      top: 10,
      left: 10,
      height: 40,
      width: 40,
    };
  });
  test('Рендерит карточку эвента', async () => {
    renderWithProvider(<EventCard event={eventMock} style={styleMock} />);
    await waitFor(() => expect(screen.queryByTestId('calendar-event')).toBeInTheDocument());
  });
  test('Рендерит тултип при наведении', async () => {
    renderWithProvider(<EventCard event={eventMock} style={styleMock} />);
    const user = userEvent.setup();
    await user.hover(screen.getByTestId('calendar-event'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeInTheDocument());
  });
});
