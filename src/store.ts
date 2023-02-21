import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "features/login/login";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
