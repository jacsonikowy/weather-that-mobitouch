import React from "react";
import styles from "./FavoriteCity.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { WeatherDataProps } from "constants/WeatherDataProps";
import { showFahrenheitOrCelsius } from "utils";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteCityArray } from "features/favoriteCities/favoriteCities";
import Button from "components/Button/Button";

interface FavoriteCityProps {
  favoriteCity: WeatherDataProps;
}

const FavoriteCity: React.FC<FavoriteCityProps> = ({ favoriteCity }) => {
  const state = useSelector((state: RootState) => state.favorites.favorites);
  const stateIsCelsius = useSelector(
    (state: RootState) => state.isCelsius.isCelsius
  );
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (favoriteCity: WeatherDataProps) => {
    if (favoriteCity !== null) {
      const newFavoriteCityState = state.filter(
        (city) => city.name !== favoriteCity.name
      );
      console.log(newFavoriteCityState);
      dispatch(setFavoriteCityArray(newFavoriteCityState));

      const favoriteCitiesFromLocalStorage =
        localStorage.getItem("favoriteCities");
      if (favoriteCitiesFromLocalStorage !== null) {
        const parsedCities = JSON.parse(favoriteCitiesFromLocalStorage);
        const result1 = parsedCities.filter(
          (city: WeatherDataProps) => city.name !== favoriteCity.name
        );

        localStorage.setItem("favoriteCities", JSON.stringify(result1));
      }
    }
  };

  if (favoriteCity.weather === undefined && favoriteCity.main === undefined) {
    return <></>;
  }

  return (
    <div className={styles.favoriteCity}>
      <div className={styles.title}>
        <span>{favoriteCity.name}</span>
        <Button
          text={<FontAwesomeIcon icon={faStar} />}
          onClick={() => handleRemoveFromFavorites(favoriteCity)}
        />
      </div>
      <div className={styles.informations}>
        <img
          src={
            `http://openweathermap.org/img/wn/${favoriteCity.weather[0].icon}@4x.png` ||
            ""
          }
          alt="weatherIcon"
        />
        {showFahrenheitOrCelsius(favoriteCity.main.temp, stateIsCelsius)}{" "}
        {favoriteCity.main.pressure}
      </div>
    </div>
  );
};

export default FavoriteCity;
