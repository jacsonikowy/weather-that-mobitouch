import axios from "axios";
import { StateProps } from "constants/StateProps";
import { WeatherDataProps } from "constants/WeatherDataProps";

export const convertToFahrenheit = (celsiusTemp: number) => {
  return Math.floor(celsiusTemp * 1.8 + 32);
};

// ------------------------------------- FETCHING DATA FROM OPENWEATHERMAP ------------------------------------- //

export const fetchCityNameData = async (city: string) => {
  const response = await axios.get<StateProps[]>(
    `http://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        appid: process.env.REACT_APP_API,
        limit: 5,
        q: city,
      },
    }
  );

  const data = response.data;

  return data;
};

export const fetchWeatherData = async (
  lat: number | null,
  lon: number | null
) => {
  const response = await axios.get<WeatherDataProps>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        appid: process.env.REACT_APP_API,
        lat: lat,
        lon: lon,
        units: "metric",
      },
    }
  );
  return response.data;
};
