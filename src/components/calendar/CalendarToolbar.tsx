import type { FC } from "react";
import { useAppDispatch } from "../../slices/hooks";
import { nextWeek, prevWeek, toggleDisplayMode } from "../../slices/calendarSlice";
import type { DisplayMode, ISODateString } from "../../slices/calendarSlice";
import { format } from "date-fns"
import { ru } from 'date-fns/locale';

interface CalendarToolbarProps {
  displayMode: DisplayMode,
  isCurrentWeek: boolean,
  selectedWeek: {
    start: ISODateString,
    end: ISODateString,
  }
}

const CalendarToolbar: FC<CalendarToolbarProps> = ({ displayMode, isCurrentWeek, selectedWeek }) => {
  const dispatch = useAppDispatch();

  const formattedWeekStart = format(selectedWeek.start, 'dd.MM.yyyy', { locale: ru});
  const formattedWeekEnd = format(selectedWeek.end, 'dd.MM.yyyy', { locale: ru });
  
  const weekRangeStyle = isCurrentWeek ? {color: 'blue' } : {color: 'black' }

  return (
    <div
      className="d-flex flex-row calendar-toolbar h-auto vw-100 py-2"
      style={{minWidth: "max-content"}}
    >
      <div className="d-flex flex-row align-items-center justify-content-evenly w-50">
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(prevWeek())}
        >{'<-'}</button>
        <p className="m-0" style={weekRangeStyle} >{`${formattedWeekStart} - ${formattedWeekEnd}`}</p>
        <button
          className="btn btn-outline-primary"
          onClick={() => dispatch(nextWeek())}
        >{'->'}</button>
      </div>
      <div className="d-flex flex-row justify-content-evenly w-50">
        <button className="btn btn-primary">
          Добавить событие
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(toggleDisplayMode())}  
        >{displayMode === 'week' ? 'Свернуть календарь' : 'Развенуть календарь'}</button>
      </div>
    </div>
  );
};
export default CalendarToolbar;