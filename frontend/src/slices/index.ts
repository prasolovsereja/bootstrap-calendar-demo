import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';
import { eventsApi } from '../api/eventsApi';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(eventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
