import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custFetch from "../../utils/custFetch";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const initialState = {
  isLoading: false,
  allBlogs: null,
  featuredBlogs: null,
  categories: null,
};

// getAllBlogs
export const getAllBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      const { data } = await custFetch("/rest/v1/blogs?select=*", {
        headers: {
          Authorization: `Bearer ${constants.supabaseApiKey}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// getFeaturedBlogs
export const getFeaturedBlogs = createAsyncThunk(
  "blog/getFeaturedBlogs",
  async (_, thunkAPI) => {
    try {
      const { data } = await custFetch.get(
        `/rest/v1/blogs?is_featured=eq.true&select=*`,
        {
          headers: {
            Authorization: `Bearer ${constants.supabaseApiKey}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// addBlog
export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (obj, thunkAPI) => {
    try {
      const resp = await custFetch.post(`/rest/v1/blogs`, obj, {
        headers: {
          Authorization: `Bearer ${constants.supabaseApiKey}`,
          Prefer: `return=minimal`,
        },
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload);
        state.allBlogs = payload;
      })
      .addCase(getAllBlogs.rejected, (state, { payload }) => {
        state.isLoading = true;
        console.log(payload);
      })
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        alert(payload);
      })
      .addCase(getFeaturedBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.featuredBlogs = payload;
      })
      .addCase(getFeaturedBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      });
  },
});

export default blogSlice.reducer;
