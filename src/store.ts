import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "features/login/login";
import CityReducer from "features/cities/weather";
import FavoriteReducer from "features/favoriteCities/favoriteCities";
import isCelsiusReducer from "features/isCelsius/isCelsius";
import ModalCityReducer from "features/cityInModal/cityInModal";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    cityProps: CityReducer,
    favorites: FavoriteReducer,
    isCelsius: isCelsiusReducer,
    cityInModal: ModalCityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
