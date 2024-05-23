import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

// store
export const store = configureStore({
  reducer: {
    userReducer,
  },
});
