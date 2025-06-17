import type { FC } from "react";
import { isEqual } from "date-fns";
import { useAppSelector } from "../../slices/hooks";
import CalendarGrid from "./CalendarGrid";
import CalendarToolbar from "./CalendarToolbar";
import { getTimeSlots } from "../../utils/time";

const CalendarLayout: FC = () => {
  const { displayMode, currentDay, selectedWeek, currentWeek } = useAppSelector((state) => state.calendar);

  const isCurrentWeek = isEqual(selectedWeek.start, currentWeek.start);

  const days = displayMode === 'week' ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] : [currentDay];
  const timeSlots = getTimeSlots();

  return (
    <div className="d-flex flex-column w-100 vh-100">
      <CalendarToolbar displayMode={displayMode} isCurrentWeek={isCurrentWeek} selectedWeek={selectedWeek} />
      <CalendarGrid daysToRender={days} timeSlots={timeSlots}/>
    </div>
  )
};
export default CalendarLayout;