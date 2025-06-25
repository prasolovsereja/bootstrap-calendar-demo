import React from 'react';
import type { Event } from '../../types/Event';

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
    <div className="position-absolute bg-primary text-white rounded-3" style={style}>
      {event.title}
    </div>
  );
});
export default EventCard;
