import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  try {
    const response = axiosInstance.post("/api/auth/login", credentials);

    toast.promise(response, {
      loading: 'Logging in...',
      success: 'Logged in successfully!',
      error: 'Failed to log in.',
    });

    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw Error(error.response.data.message);
  }
});

export const signupUser = createAsyncThunk("auth/signupUser", async (credentials) => {
  try {
    const response = axiosInstance.post("/api/auth/register", credentials);

    toast.promise(response, {
      loading: 'Signing up...',
      success: 'Signed up successfully!',
      error: 'Failed to sign up.',
    });

    return (await response).data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw Error(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken"); // Clear token on logout
      toast.success("Logged out successfully!"); // Display logout success message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // Assuming payload includes `user` object
        console.log('state-user',state?.user);
        localStorage.setItem("authToken", action.payload.token); // Store token in local storage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // Assuming payload includes `user` object
        localStorage.setItem("authToken", action.payload.token); // Store token in local storage
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
