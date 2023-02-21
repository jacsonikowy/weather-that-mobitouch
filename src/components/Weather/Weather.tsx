import React, { useEffect, useState } from "react";
import styles from "./Weather.module.scss";
import axios from "axios";

interface latAndLonProps {
  lat: number;
  lon: number;
}

const fetchCityNameData = async (city: string): Promise<latAndLonProps> => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        appid: process.env.REACT_APP_API,
        limit: 5,
        q: city,
      },
    }
  );

  const latAndLon: latAndLonProps = {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };

  return latAndLon;
};

const fetchWeatherData = async (cityName: string) => {
  const latAndLon = await fetchCityNameData(cityName);
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        appid: process.env.REACT_APP_API,
        lat: latAndLon.lat,
        lon: latAndLon.lon,
        units: "metric",
      },
    }
  );
  return await response.data;
};

interface WeatherProps {
  cityName: string;
}

const Weather: React.FC<WeatherProps> = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState<any>();

  useEffect(() => {
    if (!cityName) {
      cityName = "Warsaw";
    }

    fetchWeatherData(cityName).then((data) => {
      setWeatherData(data);
      console.log(data);
    });
  }, [cityName]);

  if (!weatherData) {
    return <div>Type city in input</div>;
  }

  return (
    <div className={styles.weather}>
      <div className={styles.weatherDesc}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
          alt=""
        />
        <span>{weatherData.weather[0].description}</span>
      </div>
      <div className={styles.weatherMain}>
        <span>{weatherData.main.temp}°C</span>
        <span>{weatherData.main.pressure} hPa</span>
      </div>
      <span className={styles.cityNameSpan}>{weatherData.name}</span>
    </div>
  );
};

export default Weather;
