export interface WeatherDataProps {
  weather: [{ description?: string; icon: string }];
  main: {
    temp: number;
    pressure: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}
