import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Event, EventDto } from '../types/Event';
import { DtoToEvent, EventToDto } from '../utils/transformEvent';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_URL;

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}api/events`,
    prepareHeaders: headers => {
      headers.set('x-api-key', `${apiKey}`);
      return headers;
    },
  }),
  tagTypes: ['Events'],
  endpoints: builder => ({
    getEvents: builder.query<Event[], {}>({
      query: () => '',
      providesTags: ['Events'],
      transformResponse: (response: EventDto[]): Event[] => {
        return response.map(DtoToEvent);
      },
    }),
    createEvent: builder.mutation<Event, Event>({
      query: (event: Event) => ({
        url: '',
        method: 'POST',
        body: EventToDto(event),
      }),
      invalidatesTags: ['Events'],
      transformResponse: (response: EventDto): Event => {
        return DtoToEvent(response);
      },
    }),
    deleteEvent: builder.mutation<void, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});
const { useGetEventsQuery, useCreateEventMutation, useDeleteEventMutation } = eventsApi;
export { useGetEventsQuery, useCreateEventMutation, useDeleteEventMutation };
