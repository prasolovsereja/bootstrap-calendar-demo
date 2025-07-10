import type { Event } from '../types/Event';
import { computePositionedEvents } from '../utils/computePositionedEvents';
describe('computePositionedEvents tests', () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'test event1',
      description: 'test event1',
      start: '9:30',
      end: '10:30',
      date: '2025-06-30T00:00:00.000Z',
    },
    {
      id: 2,
      title: 'test event2',
      description: 'test event2',
      start: '9:30',
      end: '10:30',
      date: '2025-06-30T00:00:00.000Z',
    },
  ];
  const slotWidth = 50;
  const slotHeight = 50;
  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'];
  const daysToRender = ['ПН', 'ВТ', 'СР', 'ЧТ'];
  test('Корректно рассчитывает стили для эвентов', () => {
    const result = computePositionedEvents({
      events,
      slotHeight,
      slotWidth,
      timeSlots,
      daysToRender,
    });
    expect(result[0].style).toEqual({ top: 0, height: 25, width: 100, left: 200 });
    expect(result[1].style).toEqual({ top: 25, height: 25, width: 100, left: 200 });
  });
});
