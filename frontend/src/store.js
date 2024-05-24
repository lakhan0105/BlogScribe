import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import blogReducer from "./features/blog/blogSlice";

// store
export const store = configureStore({
  reducer: {
    userReducer,
    blogReducer,
  },
});
