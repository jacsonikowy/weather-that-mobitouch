import { createSlice } from "@reduxjs/toolkit";
import { WeatherDataProps } from "constants/WeatherDataProps";

interface ConfirmationModalState {
  confirmationModalActive: boolean;
  confirmationModalCity: WeatherDataProps;
}

const initialState: ConfirmationModalState = {
  confirmationModalActive: false,
  confirmationModalCity: {
    weather: [{ description: "", icon: "" }],
    main: {
      temp: 0,
      pressure: 0,
      feels_like: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0,
    },
    wind: {
      speed: 0,
    },
    coord: {
      lat: 0,
      lon: 0,
    },
    name: "",
  },
};

const ConfirmationModalReducer = createSlice({
  name: "confirmationModal",
  initialState,
  reducers: {
    setConfirmationModalActive: (
      state: ConfirmationModalState,
      { payload }
    ) => {
      state.confirmationModalActive = payload;
    },
    setConfirmationModalCity: (state: ConfirmationModalState, { payload }) => {
      state.confirmationModalCity = payload;
    },
  },
});

export const { setConfirmationModalActive, setConfirmationModalCity } =
  ConfirmationModalReducer.actions;
export default ConfirmationModalReducer.reducer;
