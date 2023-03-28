import axios from "axios";
import { ForecastState } from "constants/Forecast";
import { StateProps } from "constants/StateProps";
import { WeatherDataProps } from "constants/WeatherDataProps";
import {
  setFavoriteCity,
  setFavoriteCityArray,
} from "features/favoriteCities/favoriteCities";
import { icons } from "mocks/IconsData";
import React from "react";
import { AppDispatch } from "store";
import { setConfirmationModalActive } from "features/confimationModal/confirmationModal";

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
  dispatch: AppDispatch,
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
      coord: {
        lat: weatherData.coord!.lat,
        lon: weatherData.coord!.lon,
      },
    };

    console.log(favoriteCityData);
    dispatch(setFavoriteCity(favoriteCityData));
    const data = localStorage.getItem("favoriteCities");
    let favoriteCitiesArray;
    data === null
      ? (favoriteCitiesArray = [])
      : (favoriteCitiesArray = JSON.parse(data));

    if (favoriteCitiesArray !== null) {
      favoriteCitiesArray.push(favoriteCityData);
      console.log(favoriteCitiesArray);
      favoriteCitiesArray.sort((a: WeatherDataProps, b: WeatherDataProps) =>
        a.name.localeCompare(b.name)
      );
      console.log(favoriteCitiesArray);
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

export const logout = (navigate: Function) => {
  localStorage.removeItem("user");
  navigate("/");
};

export const returnCurrentDate = () => {
  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();

  const dateToReturn = {
    title: `${month} ${year}`,
    subtitle: `${dayOfWeek}, ${month.slice(0, 3)} ${day} ${year}`,
  };
  return dateToReturn;
};

export const displayIcon = (icon: React.ReactNode): React.ReactNode => {
  return icons.map((iconObject) => {
    if (Array.isArray(iconObject.id)) {
      return iconObject.id.map((iconId) => {
        if (iconId === icon) {
          return iconObject.icon;
        }
      });
    } else {
      if (icon === iconObject.id) {
        return iconObject.icon;
      }
    }
  });
};

export const handleRemoveFromFavorites = (
  dispatch: AppDispatch,
  favoriteCity: WeatherDataProps,
  state: WeatherDataProps[]
) => {
  if (favoriteCity !== null) {
    const newFavoriteCityState = state.filter(
      (city: WeatherDataProps) => city.name !== favoriteCity.name
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

export const checkIfAuthenticated = () => {
  const localStorageAuthentication = localStorage.getItem("user");
  if (!!localStorageAuthentication) {
    const aaa = JSON.parse(localStorageAuthentication);
    return aaa.loggedIn;
  }
};

export const displayCurrentDayAndHour = () => {
  const date = new Date();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const hour = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${dayOfWeek}, ${hour}:${minutes}`;
};
