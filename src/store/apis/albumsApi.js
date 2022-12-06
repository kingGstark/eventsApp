import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result?.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      createAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user }];
        },
        query: (userId) => {
          return {
            url: "/albums",
            body: {
              id: nanoid,
              userId,
              title: faker.word.noun() + " " + faker.word.adjective(),
            },
            method: "POST",
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "Album", id: user }];
        },
        query: (albumId) => {
          return {
            url: `/albums/${albumId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { albumsApi };
export const {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
