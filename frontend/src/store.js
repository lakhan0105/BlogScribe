import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import blogReducer from "./features/blog/blogSlice";
import profileReducer from "./features/profile/profileSlice";

// store
export const store = configureStore({
  reducer: {
    userReducer,
    blogReducer,
    profileReducer,
  },
});
