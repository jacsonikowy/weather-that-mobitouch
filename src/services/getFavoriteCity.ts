import { StateProps } from "constants/StateProps";
import { weatherApi } from "./openweather";

export const forecastApi = weatherApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavoriteCity: builder.query<StateProps[], string>({
      query: (city) =>
        `/geo/1.0/direct?limit=${5}&q=${city}&appid=${
          process.env.REACT_APP_API
        }`,
    }),
  }),
});

export const { useGetFavoriteCityQuery } = forecastApi;
