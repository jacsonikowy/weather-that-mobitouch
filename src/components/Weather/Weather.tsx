import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import { convertToFahrenheit, fetchWeatherData } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import Button from "components/Button/Button";

interface WeatherProps {
  cityName: string;
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
interface latAndLonProps {
  lat: number;
  lon: number;
}

const Weather: React.FC<WeatherProps> = ({ cityName, celsius }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataProps>();

  if (!cityName) {
    cityName = "Warsaw";
  }

  useEffect(() => {
    //fetchWeatherData(cityName).then((data) => {
    //  setWeatherData(data);
    //  console.log(data);
    //});
  }, [cityName]);

  if (!weatherData) {
    return <div>Type city in input</div>;
  }

  return (
    <div className={styles.weather}>
      <div className={styles.wrapperBtn}>
        <Button text={<FontAwesomeIcon icon={faEmptyStar} />} />
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
