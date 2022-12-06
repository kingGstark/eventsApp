import { createSlice } from "@reduxjs/toolkit";
import fetchLocation from "../thunks/fetchLocation";
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
    results: [],
  },
  reducers: {
    changeSearch(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const { changeSearch } = searchSlice.actions;
