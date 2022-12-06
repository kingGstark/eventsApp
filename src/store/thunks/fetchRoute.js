import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default createAsyncThunk("fetch/route", async ({ from, to }) => {
  console.log(from, to);
  const coords = `${from.lon},${from.lat};${to.lng},${to.lat}`;
  const response = await axios.get(
    `http://router.project-osrm.org/route/v1/driving/${coords}`,
    {
      params: {
        steps: true,
        geometries: "polyline",
        overview: "full",
      },
    }
  );
  return response.data.routes;
});
