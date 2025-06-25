import React from 'react';
import type { Event } from '../../types/Event';
import { Tooltip } from 'react-tooltip';

interface EventCardProps {
  event: Event;
  style: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const EventCard = React.memo(({ event, style }: EventCardProps) => {
  return (
    <>
      <div
        className="position-absolute bg-primary text-white rounded-3"
        style={style}
        data-tooltip-id={`event-tooltip-${event.id}`}
        data-tooltip-content={`Название: ${event.title}\nВремя: ${event.start} - ${event.end}\nОписание: ${event.description}`}
      ></div>
      <Tooltip
        id={`event-tooltip-${event.id}`}
        place="bottom"
        style={{ zIndex: 9999, maxWidth: 200, whiteSpace: 'pre-line' }}
      />
    </>
  );
});
export default EventCard;
