import { createSlice } from "@reduxjs/toolkit";

interface FavoriteState {
  cityName: string;
  weatherImg: React.ReactNode | null;
  temperature: number | null;
  pressure: number | null;
}

const initialState: FavoriteState = {
  cityName: "",
  weatherImg: null,
  temperature: null,
  pressure: null,
};

const FavoriteReducer = createSlice({
  name: "favoriteCity",
  initialState,
  reducers: {
    setFavoriteCity: (state: FavoriteState, { payload }) => {
      state.cityName = payload.name;
      state.weatherImg = payload.weatherImg;
      state.temperature = payload.temp;
      state.pressure = payload.pressure;
    },
  },
});

export const { setFavoriteCity } = FavoriteReducer.actions;
export default FavoriteReducer.reducer;
