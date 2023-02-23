import axios from "axios";

export const convertToFahrenheit = (celsiusTemp: number) => {
  return Math.floor(celsiusTemp * 1.8 + 32);
};

// FETCHING DATA FROM OPENWEATHERMAP

interface latAndLonProps {
  lat: number;
  lon: number;
}

export const fetchCityNameData = async (city: string): Promise<any> => {
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

  //const latAndLon: latAndLonProps = {
  //  lat: response.data[0].lat,
  //  lon: response.data[0].lon,
  //};

  const data = response;

  return data;
};

export const fetchWeatherData = async (cityName: string) => {
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
