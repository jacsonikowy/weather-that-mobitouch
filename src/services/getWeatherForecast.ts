import { WeatherDataProps } from "constants/WeatherDataProps";
import { weatherApi } from "./openweather";

interface latAndLon {
  lat: number;
  lon: number;
}

export const forecastApi = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeatherForecast: builder.query<WeatherDataProps, latAndLon>({
      query: ({ lat, lon }) =>
        `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API}`,
    }),
  }),
});

export const { useGetWeatherForecastQuery } = forecastApi;
