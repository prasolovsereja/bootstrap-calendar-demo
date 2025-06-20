import type { FC } from "react";
import type { DisplayMode } from "../../slices/calendarSlice";
import type { Event } from "../../types/Event";
import EventCard from "../events/EventCard";
import { useGetSlotSize } from "../../hooks/useGetSlotSize";
import { getEventPosition } from "../../utils/getEventPosition";

interface CalendarGridProps {
  daysToRender: string[],
  timeSlots: string[],
  displayMode?: DisplayMode,
  events: Event[],
}

const CalendarGrid: FC<CalendarGridProps> = ({ daysToRender, timeSlots, events }) => {
  const { ref: slotRef, slotWidth } = useGetSlotSize();
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
      <div className={`d-flex flex-column w-auto ${daysToRender.length === 1 ? 'h-25 border-bottom': 'h-100'}`}>
        {daysToRender.map((day) => (
          <div
            key={day}
            className="d-flex border-top justify-content-evenly position-relative align-items-stretch h-100"
          >
            <div
              className="border-end d-flex align-items-center justify-content-center text-nowrap h-100 w-100"
              style={{minWidth: 40}}
            >
              {day}
            </div>

            {timeSlots.map((slot, i) => (
              <div
                key={`${day}-${slot}`}
                ref={i === 0 ? slotRef : null}
                className="border-top border-end w-100"
                style={{minWidth: 40}}
              ></div>
            ))}

            {slotWidth && (
              events.map(event => {
                const { left, width } = getEventPosition({
                  startTime: event.start,
                  endTime: event.end,
                  slotWidth,
                  timeSlots,
                });
                return (
                  <EventCard key={event.id} event={event} style={ {top: '0', left: left, width: width, height: '100%'}}/>
                )
            }))}
          </div>
        ))}
      </div>
    </div>
  )
};
export default CalendarGrid;