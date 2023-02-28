import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherDataProps } from "constants/WeatherDataProps";

interface latAndLon {
  lat: number;
  lon: number;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherForecast: builder.query<WeatherDataProps, latAndLon>({
      query: ({ lat, lon }) => `weather?lat=${lat}&lon=${lon}`,
    }),
  }),
});

export const { useGetWeatherForecast } = weatherApi;
