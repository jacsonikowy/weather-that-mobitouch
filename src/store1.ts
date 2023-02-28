import { configureStore } from "@reduxjs/toolkit/";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { weatherApi } from "services/openweather";

export const store1 = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store1.dispatch);
