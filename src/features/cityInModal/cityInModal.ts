import { createSlice } from "@reduxjs/toolkit";
import { WeatherDataProps } from "constants/WeatherDataProps";

interface StateInterface {
  cityInModal: WeatherDataProps;
  activeModal: boolean;
}

const initialState: StateInterface = {
  cityInModal: {
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
    name: "",
  },
  activeModal: false,
};

const ModalCityReducer = createSlice({
  name: "ModalCity",
  initialState,
  reducers: {
    setCityInModal: (state: StateInterface, { payload }) => {
      state.cityInModal = payload;
    },
    setModalActive: (state: StateInterface, { payload }) => {
      state.activeModal = payload;
    },
  },
});

export const { setCityInModal, setModalActive } = ModalCityReducer.actions;
export default ModalCityReducer.reducer;
