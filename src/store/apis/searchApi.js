import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://nominatim.openstreetmap.org" }),
  reducerPath: "search",
  endpoints(builder) {
    return {
      searchLocation: builder.query({
        query: (location) => {
          return {
            url: "/search.php",
            params: {
              q: location,
              format: "jsonv2",
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export { searchApi };
export const { useSearchLocationQuery } = searchApi;
