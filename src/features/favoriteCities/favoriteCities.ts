import { createSlice } from "@reduxjs/toolkit";
import { FavoriteState } from "constants/FavoriteState";

const initialState: FavoriteState = {
  name: "",
  weatherImg: null,
  temp: null,
  pressure: null,
};

const FavoriteReducer = createSlice({
  name: "favoriteCity",
  initialState,
  reducers: {
    setFavoriteCity: (state: FavoriteState, { payload }) => {
      state.name = payload.name;
      state.weatherImg = payload.weatherImg;
      state.temp = payload.temp;
      state.pressure = payload.pressure;
    },
  },
});

export const { setFavoriteCity } = FavoriteReducer.actions;
export default FavoriteReducer.reducer;
