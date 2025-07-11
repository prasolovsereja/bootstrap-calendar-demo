import type { Event, EventDto } from '../types/Event';
import { toZonedTime, format } from 'date-fns-tz';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(timeZone);
export const EventToDto = (event: Event): EventDto => {
  const { start, end, date } = event;
  const transformedStart = new Date(`${date}T${start}`).toISOString();
  const transformedEnd = new Date(`${date}T${end}`).toISOString();
  const transformedDate = new Date(date).toISOString();
  const transformedEvent: EventDto = {
    id: event.id,
    startDate: transformedStart,
    endDate: transformedEnd,
    date: transformedDate,
    description: event.description,
    createdAt: event.createdAt,
    title: event.title,
  };
  return transformedEvent;
};
export const DtoToEvent = (event: EventDto): Event => {
  const { startDate, endDate, date } = event;
  const zonedStart = toZonedTime(startDate, timeZone);
  const zonedEnd = toZonedTime(endDate, timeZone);
  const zonedDate = toZonedTime(date, timeZone);
  const transformedStart = format(zonedStart, 'HH:mm');
  const transformedEnd = format(zonedEnd, 'HH:mm');
  const transformedDate = format(zonedDate, 'yyyy-MM-dd');
  const transformedEvent: Event = {
    id: event.id,
    start: transformedStart,
    end: transformedEnd,
    date: transformedDate,
    description: event.description,
    createdAt: event.createdAt,
    title: event.title,
  };
  return transformedEvent;
};
