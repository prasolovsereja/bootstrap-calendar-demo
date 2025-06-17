import { createSlice } from "@reduxjs/toolkit";
import { startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";

export type DisplayMode = 'week' | 'day';

export const displayModes = {
  week: 'week' as DisplayMode,
  day: 'day' as DisplayMode,
};

type ISODateString = string;

interface CalendarSliceState {
  displayMode: DisplayMode,
  currentDay: ISODateString,
  currentWeek: {
    start: ISODateString,
    end: ISODateString,
  },
  selectedWeek: {
    start: ISODateString,
    end: ISODateString,
  }
};

const currentDate = new Date();
const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();
const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();

const initialState: CalendarSliceState = {
  displayMode: displayModes.week,
  currentDay: currentDate.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase(),
  currentWeek: {
    start: startOfWeekDate,
    end: endOfWeekDate,
  },
  selectedWeek: {
    start: startOfWeekDate,
    end: endOfWeekDate,
  }
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleDisplayMode: (state) => {
      if (state.displayMode === 'week') {
        state.displayMode = 'day';
      } else {
        state.displayMode = 'week';
      }
    },
    nextWeek: (state) => {
      const newDate = addWeeks(new Date(state.selectedWeek.start), 1);
      state.selectedWeek.start = startOfWeek(newDate, { weekStartsOn: 1 }).toISOString();
      state.selectedWeek.end = endOfWeek(newDate, { weekStartsOn: 1 }).toISOString();
    },
    prevWeek: (state) => {
      const newDate = subWeeks(new Date(state.selectedWeek.start), 1);
      state.selectedWeek.start = startOfWeek(newDate, { weekStartsOn: 1 }).toISOString();
      state.selectedWeek.end = endOfWeek(newDate, { weekStartsOn: 1 }).toISOString();
    }
  }
});

export const {
  toggleDisplayMode,
  nextWeek,
  prevWeek,
} = calendarSlice.actions;
export default calendarSlice.reducer;