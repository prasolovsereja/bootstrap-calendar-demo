import type { FC } from "react";
import type { DisplayMode } from "../../slices/calendarSlice";
import type { PositionedEvent } from "../../types/Event";
import EventCard from "../events/EventCard";


interface CalendarGridProps {
  daysToRender: string[],
  timeSlots: string[],
  displayMode?: DisplayMode,
  positionedEvents: PositionedEvent[],
  slotRef: React.RefObject<HTMLDivElement>
}

const CalendarGrid: FC<CalendarGridProps> = ({ daysToRender, timeSlots, positionedEvents, slotRef }) => {
  
  return (
    <div className="d-flex flex-column position-relative w-100 vh-100">
      <div className="d-flex position-sticky top-0 bg-light" style={{ zIndex: 1 }}>
        <div className="w-100" style={{minWidth: 40}}>
        </div>
        {timeSlots.map((slot) => (
          <div
            key={slot}
            className="border text-center py-2 w-100"
            style={{minWidth: 40}}
          >
            {slot}
          </div>
        ))}
      </div>
      <div className={`d-flex flex-column position-relative w-auto ${daysToRender.length === 1 ? 'h-25 border-bottom': 'h-100'}`}>
        {daysToRender.map((day, i) => (
          <div
            key={day}
            className="d-flex border-top justify-content-evenly  align-items-stretch h-100"
          >
            <div
              className="border-end d-flex align-items-center justify-content-center text-nowrap h-100 w-100"
              style={{minWidth: 40}}
              ref={i === 0 ? slotRef : null}
            >
              {day}
            </div>

            {timeSlots.map((slot) => (
              <div
                key={`${day}-${slot}`}
                className="border-top border-end w-100"
                style={{minWidth: 40}}
              ></div>
            ))}

            
          </div>
        ))}
        {positionedEvents.map(({ event, style }) => {
              return (
                <EventCard key={event.id} event={event} style={style} />
              )
        })}
      </div>
    </div>
  )
};
export default CalendarGrid;