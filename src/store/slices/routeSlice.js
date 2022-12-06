import { createSlice } from "@reduxjs/toolkit";
export const routeSlice = createSlice({
  name: "route",
  initialState: {
    from: null,
    to: null,
    points: [],
  },
  reducers: {
    changeFrom(state, action) {
      state.from = action.payload;
    },
    changeTo(state, action) {
      state.to = action.payload;
    },
  },
});

export const { changeFrom, changeTo } = routeSlice.actions;
