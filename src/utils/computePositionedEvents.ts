import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Event, PositionedEvent } from '../types/Event';
import { getEventPosition } from './getEventPosition';

type Args = {
  events: Event[];
  slotWidth: number;
  timeSlots: string[];
  daysToRender: string[];
  slotHeight: number;
};

export const computePositionedEvents = ({
  events,
  slotWidth,
  timeSlots,
  daysToRender,
  slotHeight,
}: Args): PositionedEvent[] => {
  const result: PositionedEvent[] = [];
  const renderedEvents = new Set<string>();
  daysToRender.forEach((day, rowIndex) => {
    const eventsInDay = events.filter(event => {
      const formattedEventDay = format(parseISO(event.date), 'EE', { locale: ru })
        .toUpperCase()
        .slice(0, 2);
      return formattedEventDay === day;
    });
    const slotsMap = new Map<number, Event[]>();
    eventsInDay.forEach(event => {
      const { startIndex, span } = getEventPosition({
        startTime: event.start,
        endTime: event.end,
        slotWidth,
        timeSlots,
      });
      for (let offset = 0; offset < span; offset++) {
        const column = startIndex + offset;
        if (!slotsMap.has(column)) slotsMap.set(column, []);
        slotsMap.get(column)!.push(event);
      }
    });

    slotsMap.forEach(events => {
      const total = events.length;
      events.forEach(event => {
        if (renderedEvents.has(event.id)) return;
        const { left, width } = getEventPosition({
          startTime: event.start,
          endTime: event.end,
          slotWidth,
          timeSlots,
        });
        result.push({
          event,
          style: {
            top: rowIndex * (slotHeight / total),
            height: slotHeight / total,
            width,
            left,
          },
        });
        renderedEvents.add(event.id);
      });
    });
  });
  return result;
};
