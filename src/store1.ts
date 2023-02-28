import { configureStore } from "@reduxjs/toolkit/";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { weatherApi } from "services/openweather";
import { forecastApi } from "services/getWeatherForecast";

export const store1 = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [forecastApi.reducerPath]: forecastApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store1.dispatch);
