import { createSlice } from "@reduxjs/toolkit";
import { WeatherDataProps } from "constants/WeatherDataProps";

interface FavoriteState {
  favorites: WeatherDataProps[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const FavoriteReducer = createSlice({
  name: "favoriteCity",
  initialState,
  reducers: {
    setFavoriteCity: (state: FavoriteState, { payload }) => {
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
          feels_like: payload.main.feels_like,
          temp_max: payload.main.temp_max,
          temp_min: payload.main.temp_min,
          humidity: payload.main.humidity,
        },
        wind: {
          speed: payload.wind.speed,
        },
        coord: {
          lat: payload.coord.lat,
          lon: payload.coord.lon
        }
      };
      state.favorites.push(payloadObject);
    },
    setFavoriteCityArray: (state: FavoriteState, { payload }) => {
      state.favorites = payload;
    },
  },
});

export const { setFavoriteCity, setFavoriteCityArray } =
  FavoriteReducer.actions;
export default FavoriteReducer.reducer;
