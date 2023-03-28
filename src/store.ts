import { configureStore } from "@reduxjs/toolkit/";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { weatherApi } from "services/openweather";
import LoginReducer from "features/login/login";
import CityReducer from "features/cities/weather";
import FavoriteReducer from "features/favoriteCities/favoriteCities";
import isCelsiusReducer from "features/isCelsius/isCelsius";
import ModalCityReducer from "features/cityInModal/cityInModal";
import SidebarReducer from "features/sidebar/sidebar";
import confirmationModalReducer from "features/confimationModal/confirmationModal";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    login: LoginReducer,
    cityProps: CityReducer,
    favorites: FavoriteReducer,
    isCelsius: isCelsiusReducer,
    cityInModal: ModalCityReducer,
    sidebar: SidebarReducer,
    confirmationModalActive: confirmationModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
