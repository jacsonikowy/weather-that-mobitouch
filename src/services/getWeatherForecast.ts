import { WeatherDataProps } from "constants/WeatherDataProps";
import { weatherApi } from "./openweather";

interface latAndLon {
  lat: number;
  lon: number;
}

export const forecastApi = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeatherForecast: builder.query<WeatherDataProps, latAndLon>({
      query: ({ lat, lon }) => `weather?lat=${lat}&lon=${lon}`,
    }),
  }),
});

export const useGetWeatherForecast =
  forecastApi.endpoints.getWeatherForecast.useQuery;

// export const { useGetWeatherForecast } = forecastApi;
