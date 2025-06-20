import { useState, useMemo, type FC } from "react";
import { isEqual } from "date-fns";
import { useAppSelector } from "../../slices/hooks";
import CalendarGrid from "./CalendarGrid";
import CalendarToolbar from "./CalendarToolbar";
import { getTimeSlots } from "../../utils/time";
import type { Event } from "../../types/Event";
import CreateEventModal from "../modals/createEventModal";
import { useGetSlotSize } from "../../hooks/useGetSlotSize";
import { computePositionedEvents } from "../../utils/computePositionedEvents";

const CalendarLayout: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { displayMode, currentDay, selectedWeek, currentWeek } = useAppSelector((state) => state.calendar);

  const isCurrentWeek = isEqual(selectedWeek.start, currentWeek.start);

  const daysToRender = useMemo (() => {
    return displayMode === 'week' ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] : [currentDay];
  }, [displayMode, currentDay])

  const timeSlots = getTimeSlots();

  const handleAddEvent = (data: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...data,
      id: crypto.randomUUID(),
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const { ref: slotRef, slotWidth, slotHeight } = useGetSlotSize(daysToRender);
  console.log('slotRef>>', slotRef);
  console.log('slotWidth>>>', slotWidth);
  console.log('slotHeight>>>', slotHeight);
  const eventsToRender = useMemo(() => {
    if (!slotWidth || !slotHeight) return [];
    return computePositionedEvents({
    events,
    slotWidth,
    timeSlots,
    daysToRender,
    slotHeight
  });
  }, [events, slotWidth, timeSlots, daysToRender, slotHeight]) 
  return (
    <div className="d-flex flex-column w-100 vh-100">
      <CalendarToolbar
        displayMode={displayMode}
        isCurrentWeek={isCurrentWeek}
        selectedWeek={selectedWeek}
        openModal={() => setIsModalOpen(true)}
      />
      <CalendarGrid
        daysToRender={daysToRender}
        timeSlots={timeSlots}
        positionedEvents={eventsToRender}
        slotRef={slotRef}
      />
      {isModalOpen && <CreateEventModal onSubmit={handleAddEvent} onClose={() => setIsModalOpen(false)}/>}
    </div>
  )
};
export default CalendarLayout;