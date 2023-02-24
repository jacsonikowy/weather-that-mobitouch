import { createSlice } from "@reduxjs/toolkit";
import { WeatherDataProps } from "constants/WeatherDataProps";

const initialState: WeatherDataProps[] = [];

const FavoriteReducer = createSlice({
  name: "favoriteCity",
  initialState,
  reducers: {
    setFavoriteCity: (state: WeatherDataProps[], { payload }) => {
      const payloadObject: WeatherDataProps = {
        name: payload.name,
        weather: [
          {
            description: payload.weather[0].description,
            icon: payload.weather[0].icon,
          },
        ],
        main: {
          temp: payload.main.temp,
          pressure: payload.main.pressure,
        },
      };
      state.push(payloadObject);
    },
  },
});

export const { setFavoriteCity } = FavoriteReducer.actions;
export default FavoriteReducer.reducer;
