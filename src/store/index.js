import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { fetchUsers } from "./thunks/fetchUsers";
import { addUser } from "./thunks/addUser";
import { removeUser } from "./thunks/deleteUser";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";

import {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
} from "./apis/photosApi";

import {
  useFetchEventsQuery,
  useCreateEventMutation,
  useRemoveEventMutation,
} from "./apis/eventsApi";
import { useSearchLocationQuery } from "./apis/searchApi";
import { searchApi } from "./apis/searchApi";
import { searchSlice, changeSearch } from "./slices/searchSlice";
import { eventsApi } from "./apis/eventsApi";
import { routeSlice } from "./slices/routeSlice";
import { changeFrom, changeTo } from "./slices/routeSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    search: searchSlice.reducer,
    route: routeSlice.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
      .concat(eventsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { fetchUsers, addUser, changeSearch, changeFrom, changeTo };
export {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useRemovePhotoMutation,
  useFetchEventsQuery,
  useCreateEventMutation,
  useRemoveEventMutation,
};
