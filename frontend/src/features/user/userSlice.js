import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserLS, getUserLS, removeUserLS } from "../../utils/localStorage";
import constants from "../../utils/constants";

// appwrite
import { Client, Account, ID, Databases } from "appwrite";
const client = new Client()
  .setEndpoint(constants.appwriteEndpoint) // Your API Endpoint
  .setProject(constants.appwriteProjectId);
const account = new Account(client);
const databases = new Databases(client);

// initial state
const initialState = {
  isLoading: false,
  user: getUserLS(),
};

// registerUser
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (values, thunkAPI) => {
    const { userId, email, first_name: name, password } = values;
    try {
      const resp = await account.create(userId, email, password, name);
      thunkAPI.dispatch(
        createUserDoc({ userId, email, userName: name, userImg: "" })
      );
      alert("registered successfully!");
      return resp;
    } catch (error) {
      if (error.response.code === 409) {
        console.log("user with same credentials already exisits!");
        return;
      }
      if (error.response.code === 429) {
        console.log("rate limit exeeded! Please wait for sometime!");
        return;
      }
      return thunkAPI.rejectWithValue(error?.response || error);
    }
  }
);

// loginUser
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await account.createEmailPasswordSession(email, password);
      thunkAPI.dispatch(getCurrUser());
      return resp;
    } catch (error) {
      console.log(error);
      if (error.response.code === 401) {
        alert("invalid credentials!");
        return;
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// getCurrUser
export const getCurrUser = createAsyncThunk(
  "user/getCurrUser",
  async (_, thunkAPI) => {
    try {
      const resp = await account.get();
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const resp = await account.deleteSessions();
      return resp;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// createUserDoc -> creates a row in the users collection in the database
export const createUserDoc = createAsyncThunk(
  "user/createUserDoc",
  async (obj, thunkAPI) => {
    try {
      const resp = await databases.createDocument(
        constants.appwriteDatabaseId,
        constants.appwriteUsersCollectionId,
        ID.unique(),
        obj
      );
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = true;
        console.log(payload);
        alert(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      })
      .addCase(getCurrUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
        state.user = payload;
        addUserLS(payload);
      })
      .addCase(getCurrUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        removeUserLS();
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        alert(payload);
      })
      .addCase(createUserDoc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserDoc.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createUserDoc.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

// exports
export default userSlice.reducer;
