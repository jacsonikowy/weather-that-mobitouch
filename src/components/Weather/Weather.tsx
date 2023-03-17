import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import {
  checkIfFavorite,
  convertToFahrenheit,
  displayIcon,
  fetchWeatherData,
  handleAddFavorites,
  handleRemoveFromFavorites,
} from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { WeatherDataProps } from "constants/WeatherDataProps";
import {
  setCityInModal,
  setModalActive,
} from "features/cityInModal/cityInModal";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();
  const city = useSelector((state: RootState) => state.cityProps.cityProps);
  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        const response = await fetchWeatherData(city.lat, city.lon);
        setWeatherData(response);
      };
      fetchData();
    }
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const icon = weatherData.weather[0].icon

  return (
    <div className={styles.weather}>
      <div className={styles.wrapperBtn}>
        <Button
          text={
            <FontAwesomeIcon
              icon={
                checkIfFavorite(favoriteCities, weatherData)
                  ? faStar
                  : faEmptyStar
              }
            />
          }
          onClick={() =>
            {
              if(!checkIfFavorite(favoriteCities, weatherData)){
                handleAddFavorites(weatherData, dispatch, favoriteCities)
              } else {
              handleRemoveFromFavorites(dispatch, weatherData, favoriteCities)
              }
            }
          }
        />
      </div>
      <div className={styles.weatherDesc}>
        <div className={styles.weatherIcon}>
          {displayIcon(icon)}
        </div>
        <span className={styles.weatherInfo}>{weatherData.weather[0].description}</span>
      </div>
      <div className={styles.weatherMain}>
        <span>{`${
          celsius
            ? `${Math.round(weatherData.main.temp)}°C`
            : `${convertToFahrenheit(weatherData.main.temp)}°F`
        }`}</span>
        <span>{weatherData.main.pressure} hPa</span>
      </div>
      <span className={styles.cityNameSpan}>{weatherData.name}</span>
      <Button
        text="Show More"
        onClick={() => {
          dispatch(setModalActive(true));
          dispatch(setCityInModal(weatherData));
        }}
      />
    </div>
  );
};

export default Weather;
