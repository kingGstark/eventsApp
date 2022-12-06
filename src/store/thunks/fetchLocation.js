import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk("fetch/location", async (location) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org`, {
    params: {
      q: location,
      format: "jsonv2",
    },
  });
  return response.data;
});
