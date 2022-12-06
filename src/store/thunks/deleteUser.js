import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const removeUser = createAsyncThunk("users/remove", async (id) => {
  const response = await axios.delete(`http://localhost:3005/users/${id}`);
  return id;
});
