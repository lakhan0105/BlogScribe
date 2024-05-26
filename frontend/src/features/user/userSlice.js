import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import custFetch from "../../utils/custFetch";
import { addUserLS, getUserLS } from "../../utils/localStorage";

// initial state
const initialState = {
  isLoading: false,
  user: getUserLS(),
};

// registerUser
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ first_name, email, password, username }, thunkAPI) => {
    try {
      const resp = await custFetch.post("/auth/v1/signup", {
        email,
        password,
        data: {
          first_name,
          username,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response);
    }
  }
);

// loginUser
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (obj, thunkAPI) => {
    try {
      const resp = await custFetch.post(
        "/auth/v1/token?grant_type=password",
        obj
      );
      const { access_token, refresh_token, expires_at, user } = resp?.data;
      const { user_metadata, id: user_id } = user;
      return {
        access_token,
        refresh_token,
        expires_at,
        ...user_metadata,
        user_id,
      };
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 400) {
        return thunkAPI.rejectWithValue("Invalid credentials");
      } else {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
    }
  }
);

// userSlice
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const user = payload.user_metadata;
        state.user = user;
        addUserLS(user);
        console.log(payload);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = true;

        // check error for too many requests
        if (payload.status === 429) {
          alert("429:too many email requests, please wait for some time!");
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        state.user = payload;
        addUserLS(payload);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      });
  },
});

// exports
export default userSlice.reducer;
