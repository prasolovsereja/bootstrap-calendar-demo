import type { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DisplayMode } from '../../slices/calendarSlice';
import type { PositionedEvent } from '../../types/Event';
import EventCard from '../events/EventCard';
import './CalendarGrid.css';

interface CalendarGridProps {
  daysToRender: string[];
  timeSlots: string[];
  displayMode?: DisplayMode;
  positionedEvents: PositionedEvent[];
  slotRef: React.RefObject<HTMLDivElement>;
  animationStage:
    | 'expanded'
    | 'collapsing'
    | 'collapsed'
    | 'expanding'
    | 'disappearing-collapsing'
    | 'disappearing-expanding';
}

const CalendarGrid: FC<CalendarGridProps> = ({
  daysToRender,
  timeSlots,
  positionedEvents,
  slotRef,
  animationStage,
}) => {
  return (
    <div className="d-flex flex-column position-relative w-100 vh-100">
      <div className="d-flex position-sticky top-0 bg-light" style={{ zIndex: 1 }}>
        <div className="w-100" style={{ minWidth: 40 }}></div>
        {timeSlots.map(slot => (
          <div key={slot} className="border text-center py-2 w-100" style={{ minWidth: 40 }}>
            {slot}
          </div>
        ))}
      </div>

      <div
        className={`d-flex flex-column position-relative w-auto ${
          animationStage === 'expanded' ||
          animationStage == 'collapsing' ||
          animationStage === 'disappearing-collapsing'
            ? 'h-100'
            : 'h-25'
        } ${animationStage === 'collapsed' ? 'border-bottom' : ''} `}
      >
        <AnimatePresence initial={false}>
          {daysToRender.map((day, i) => {
            const isCurrentDay = daysToRender.length === 1;
            return (
              <motion.div
                key={day}
                className="d-flex border-top justify-content-evenly overflow-hidden align-items-stretch h-100"
                initial={{
                  opacity: 0,
                  y: animationStage === 'expanding' ? -30 : 0,
                  height:
                    animationStage === 'expanding' || animationStage === 'collapsing' ? 0 : '25%',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: isCurrentDay ? '25%' : animationStage === 'collapsed' ? 0 : '25%',
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  height: 0,
                  scaleY: 0.8,
                  transition: {
                    duration: 0.15,
                    delay: (daysToRender.length - 1 - i) * 0.1, // <- каскад снизу вверх
                  },
                }}
                // exit={{}}
                transition={{ duration: 0.1, delay: i * 0.1 }}
              >
                <div
                  className="border-end d-flex align-items-center justify-content-center  text-nowrap h-100 w-100"
                  style={{ minWidth: 40 }}
                  ref={i === 0 ? slotRef : null}
                >
                  {day}
                </div>

                {timeSlots.map(slot => (
                  <div
                    key={`${day}-${slot}`}
                    className="border-top border-end w-100"
                    style={{ minWidth: 40 }}
                  ></div>
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {positionedEvents.map(({ event, style }) => {
          return <EventCard key={event.id} event={event} style={style} />;
        })}
      </div>
    </div>
  );
};
export default CalendarGrid;
