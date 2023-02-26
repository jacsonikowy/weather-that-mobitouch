import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import { convertToFahrenheit, fetchWeatherData } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setFavoriteCity } from "features/favoriteCities/favoriteCities";
import { WeatherDataProps } from "constants/WeatherDataProps";

interface WeatherProps {
  setModalActive: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setCityInModal: (value: WeatherDataProps) => void;
}

const handleAddFavorites = (
  weatherData: WeatherDataProps,
  dispatch: Function,
  favoriteCitiesState: WeatherDataProps[]
) => {

  if (weatherData && favoriteCitiesState.some(city => city.name === weatherData.name) === false) {
    const favoriteCityData: WeatherDataProps = {
      name: weatherData.name,
      weather: [
        {
          icon: weatherData.weather[0].icon,
        },
      ],
      main: {
        temp: weatherData.main.temp,
        pressure: weatherData.main.pressure,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
      },
      wind: {
        speed: weatherData.wind.speed,
      },
    };
    dispatch(setFavoriteCity(favoriteCityData));
    const data = localStorage.getItem("favoriteCities");
    let array;
    data === null ? (array = []) : (array = JSON.parse(data));

    const favoriteCitiesArray = array;
    if (favoriteCitiesArray !== null) {
      favoriteCitiesArray.push(favoriteCityData);
    }
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesArray));
  }
};

const checkIfFavorite = (
  favoriteCities: WeatherDataProps[],
  cityToCheck: WeatherDataProps
) => {
  let boolean;

  favoriteCities.map((city) => {
    if (city.name === cityToCheck.name) {
      boolean = true;
    } else {
      boolean = false;
    }
  });

  return boolean;
};

const Weather: React.FC<WeatherProps> = ({
  setModalActive,
  setCityInModal,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();
  const city = useSelector((state: RootState) => state.cityProps.cityProps);
  const favoriteCities = useSelector((state: RootState) => state.favorites.favorites);
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius)
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
    return <div>Type city in input</div>;
  }

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
          onClick={() => handleAddFavorites(weatherData, dispatch, favoriteCities)}
        />
      </div>
      <div className={styles.weatherDesc}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` || ""}
          alt=""
        />
        <span>{weatherData.weather[0].description}</span>
      </div>
      <div className={styles.weatherMain}>
        <span>{`${celsius
          ? `${Math.round(weatherData.main.temp)}°C`
          : `${convertToFahrenheit(weatherData.main.temp)}°F`
          }`}</span>
        <span>{weatherData.main.pressure} hPa</span>
      </div>
      <span className={styles.cityNameSpan}>{weatherData.name}</span>
      <Button
        text="Show More"
        onClick={() => {
          setModalActive(true);
          setCityInModal(weatherData);
        }}
      />
    </div>
  );
};

export default Weather;
