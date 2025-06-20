import React from "react";
import type { Event } from "../../types/Event";

interface EventCardProps {
  event: Event,
  style: {
    top: string,
    left: number,
    width: number,
    height: string,
  }
}

const EventCard = React.memo(({ event, style }: EventCardProps) => {
  return (
    <div className="position-absolute bg-primary text-white" style={style}>
      {event.title}
    </div>
  )
})
export default EventCard;