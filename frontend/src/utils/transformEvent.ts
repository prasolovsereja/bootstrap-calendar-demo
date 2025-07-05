import type { Event, EventDto } from '../types/Event';

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
  const transformedStart = new Date(startDate).toISOString().split('T')[1].slice(0, 5);
  const transformedEnd = new Date(endDate).toISOString().split('T')[1].slice(0, 5);
  const transformedDate = new Date(date).toISOString().split('T')[0];
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
