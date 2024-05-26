import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custFetch from "../../utils/custFetch";

// initialState
const initialState = {
  profiles: {},
  isLoading: false,
};

// getProfileById
export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
  async (user_id, thunkAPI) => {
    try {
      const resp = await custFetch(
        `/rest/v1/profiles?id=eq.${user_id}&select=*`
      );
      return resp.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// profileSlice
export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profiles[payload.id] = payload;
      })
      .addCase(getProfileById.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      });
  },
});

export default profileSlice.reducer;
