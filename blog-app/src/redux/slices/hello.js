// helloSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  status: "idle",
  error: null,
};

export const sendHelloData = createAsyncThunk(
  "hello/sendData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/hell", data);
      toast.success("Data sent successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to send data!");
      return rejectWithValue(error.response.data);
    }
  }
);

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendHelloData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendHelloData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendHelloData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default helloSlice.reducer;
