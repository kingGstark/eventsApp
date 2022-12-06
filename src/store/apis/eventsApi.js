import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
const eventsApi = createApi({
  reducerPath: "events",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchEvents: builder.query({
        providesTags: [{ type: "event" }],
        query: () => {
          return {
            url: "/events",
            method: "GET",
          };
        },
      }),
      createEvent: builder.mutation({
        invalidatesTags: [{ type: "event" }],
        query: (event) => {
          return {
            url: "/events",
            body: {
              id: nanoid,
              ...event,
            },
            method: "POST",
          };
        },
      }),
      removeEvent: builder.mutation({
        query: (eventId) => {
          return {
            url: `/events/${eventId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { eventsApi };
export const {
  useFetchEventsQuery,
  useCreateEventMutation,
  useRemoveEventMutation,
} = eventsApi;
