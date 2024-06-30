// blogSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";
import { CATEGORIES } from "../../constants/categories";

// Async Thunks for CRUD operations
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = axiosInstance.get("/api/blogs");

  toast.promise(response, {
    loading: 'Fetching blogs...',
    success: 'Blogs fetched successfully!',
    error: 'Failed to fetch blogs.',
  });

  return (await response).data;
});

export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (id) => {
  const response = axiosInstance.get(`/api/blogs/${id}`);

  toast.promise(response, {
    loading: 'Fetching blog...',
    success: 'Blog fetched successfully!',
    error: 'Failed to fetch blog.',
  });

  return (await response).data;
});

export const createBlog = createAsyncThunk("blogs/createBlog", async (newBlog) => {
  const response = axiosInstance.post("/api/blogs", newBlog, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  toast.promise(response, {
    loading: 'Creating blog...',
    success: 'Blog created successfully!',
    error: 'Failed to create blog.',
  });

  return (await response).data;
});

export const updateBlog = createAsyncThunk("blogs/updateBlog", async (updatedBlog) => {
  const { id } = updatedBlog;
  const response = axiosInstance.put(`/api/blogs/${id}`, updatedBlog, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  toast.promise(response, {
    loading: 'Updating blog...',
    success: 'Blog updated successfully!',
    error: 'Failed to update blog.',
  });

  return (await response).data;
});

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const response = axiosInstance.delete(`/api/blogs/${id}`);

  toast.promise(response, {
    loading: 'Deleting blog...',
    success: 'Blog deleted successfully!',
    error: 'Failed to delete blog.',
  });

  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
    categories: CATEGORIES,
    currentCat: "All", // Initial value for current category
  },
  reducers: {
    setCurrentCat: (state, action) => {
      state.currentCat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = [action.payload]; // Assuming we're updating the state with a single blog
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export const { setCurrentCat } = blogSlice.actions;

export default blogSlice.reducer;
