import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custFetch from "../../utils/custFetch";

import { Client, Databases, Query } from "appwrite";
import constants from "../../utils/constants";
const client = new Client()
  .setEndpoint(constants.appwriteEndpoint) // Your API Endpoint
  .setProject(constants.appwriteProjectId); // Your project ID
const databases = new Databases(client);

// initialState
const initialState = {
  profiles: {},
  isLoading: false,
};

// getProfileById
export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
  async (userId, thunkAPI) => {
    try {
      const resp = await databases.listDocuments(
        constants.appwriteDatabaseId,
        constants.appwriteUsersCollectionId,
        [Query.equal("userId", [userId])]
      );
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.profiles[payload?.documents[0]?.userId] = payload?.documents[0];
      })
      .addCase(getProfileById.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert("error from getProfileById", payload);
      });
  },
});

export default profileSlice.reducer;
