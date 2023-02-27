import { createSlice } from "@reduxjs/toolkit";
import { StateProps } from "constants/StateProps";

interface CityState {
  cityProps: StateProps;
}

const initialState: CityState = {
  cityProps: {
    name: "",
    local_names: {
      en: "",
    },
    lat: 52.237049,
    lon: 21.017532,
    country: "",
    state: "",
  },
};

const LoginSlice = createSlice({
  name: "cityNameToFetch",
  initialState,
  reducers: {
    setCity: (state: CityState, { payload }) => {
      state.cityProps = payload;
    },
  },
});

export const { setCity } = LoginSlice.actions;
export default LoginSlice.reducer;
