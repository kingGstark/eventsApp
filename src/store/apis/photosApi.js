import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, photo) => {
          return [{ type: "photo", id: photo.id }];
        },
        query: (photo) => {
          return {
            url: "/photos",
            params: {
              albumId: photo.id,
            },
            method: "GET",
          };
        },
      }),
      createPhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "photo", id: photo }];
        },
        query: (albumId) => {
          return {
            url: "/photos",
            body: {
              id: nanoid,
              albumId,
              title: faker.word.noun() + " " + faker.word.adjective(),
              imageUrl: faker.image.imageUrl(500, 450, "cat", true),
            },
            method: "POST",
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "photo", id: photo }];
        },
        query: (photoId) => {
          return {
            url: `/photos/${photoId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export { photosApi };
export const {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
