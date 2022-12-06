import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    id: nanoid,
    name: faker.name.fullName(),
  });
  return response.data;
});
