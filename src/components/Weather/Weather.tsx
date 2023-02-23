import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import { convertToFahrenheit, fetchWeatherData } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setFavoriteCity } from "features/favoriteCities/favoriteCities";
import { FavoriteState } from "constants/FavoriteState";

interface WeatherProps {
  celsius: boolean;
}

interface WeatherDataProps {
  weather: [{ description: string; icon: string }];
  main: {
    temp: number;
    pressure: string;
  };
  name: string;
}

const Weather: React.FC<WeatherProps> = ({ celsius }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();
  const city = useSelector((state: RootState) => state.cityProps.cityProps);
  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      fetchWeatherData(city.lat, city.lon)
        .then((data) => {
          const response = data;
          return response;
        })
        .then((response) => {
          setWeatherData(response);
        });
    }
  }, [city]);

  if (!weatherData) {
    return <div>Type city in input</div>;
  }

  return (
    <div className={styles.weather}>
      <div className={styles.wrapperBtn}>
        <Button
          text={
            <FontAwesomeIcon
              icon={faEmptyStar}
              onClick={() => {
                if (weatherData) {
                  const favoriteCityData: FavoriteState = {
                    name: weatherData.name,
                    weatherImg: weatherData.weather[0].icon,
                    temp: weatherData.main.temp,
                    pressure: weatherData.main.pressure,
                  };
                  dispatch(setFavoriteCity(favoriteCityData));
                }
              }}
            />
          }
        />
      </div>
      <div className={styles.weatherDesc}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt=""
        />
        <span>{weatherData.weather[0].description}</span>
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
    </div>
  );
};

export default Weather;
