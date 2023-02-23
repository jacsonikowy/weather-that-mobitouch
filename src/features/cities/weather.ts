import { createSlice } from "@reduxjs/toolkit";

interface CityState {
  cityProps: {
    name: string;
    local_names: {
      en: string;
    };
    lat: number | null;
    lon: number | null;
    country: string;
    state: string;
  };
}

const initialState: CityState = {
  cityProps: {
    name: "",
    local_names: {
      en: "",
    },
    lat: null,
    lon: null,
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
