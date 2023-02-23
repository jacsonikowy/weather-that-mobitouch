import axios from "axios";
import { StateProps } from "constants/StateProps";

export const convertToFahrenheit = (celsiusTemp: number) => {
  return Math.floor(celsiusTemp * 1.8 + 32);
};

// ------------------------------------- FETCHING DATA FROM OPENWEATHERMAP ------------------------------------- //

interface WeatherDataProps {
  weather: [{ description: string; icon: string }];
  main: {
    temp: number;
    pressure: string;
  };
  name: string;
}

export const fetchCityNameData = async (
  city: string
): Promise<StateProps[]> => {
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

  const data = response.data;

  return data;
};

export const fetchWeatherData = async (
  lat: number | null,
  lon: number | null
): Promise<WeatherDataProps> => {
  const response = await axios.get(
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
  return await response.data;
};
