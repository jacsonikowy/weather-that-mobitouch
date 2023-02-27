import axios from "axios";
import { ForecastState } from "constants/Forecast";
import { StateProps } from "constants/StateProps";
import { WeatherDataProps } from "constants/WeatherDataProps";
import { setFavoriteCity } from "features/favoriteCities/favoriteCities";

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

export const fetchWeatherData = async (lat: number, lon: number) => {
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

export const fetch5Day3HourForecast = async (lat: number, lon: number) => {
  const response = await axios.get<ForecastState>(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        appid: process.env.REACT_APP_API,
        lat: lat,
        lon: lon,
        units: "metric",
      },
    }
  );

  console.log(response.data.list);

  return response.data.list;
};

export const showFahrenheitOrCelsius = (data: number, celsius: boolean) => {
  return celsius ? `${Math.ceil(data)}°C` : `${convertToFahrenheit(data)}°F`;
};

export const convertUnixTime = (time: number) => {
  const dtFormat = new Intl.DateTimeFormat("pl-PL", {
    timeStyle: "short",
    dateStyle: "short",
    timeZone: "CET",
  });

  return dtFormat.format(new Date(time * 1e3));
};

export const handleAddFavorites = (
  weatherData: WeatherDataProps,
  dispatch: Function,
  favoriteCitiesState: WeatherDataProps[]
) => {
  if (
    weatherData &&
    favoriteCitiesState.some((city) => city.name === weatherData.name) === false
  ) {
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
    let favoriteCitiesArray;
    data === null
      ? (favoriteCitiesArray = [])
      : (favoriteCitiesArray = JSON.parse(data));

    if (favoriteCitiesArray !== null) {
      favoriteCitiesArray.push(favoriteCityData);
    }

    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesArray));
  }
};

export const checkIfFavorite = (
  favoriteCities: WeatherDataProps[],
  cityToCheck: WeatherDataProps
) => {
  let boolean;

  favoriteCities.forEach((city) => {
    if (city.name === cityToCheck.name) {
      boolean = true;
    } else {
      boolean = false;
    }
  });

  return boolean;
};
