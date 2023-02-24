export interface WeatherDataProps {
  weather: [{ description?: string; icon: string }];
  main: {
    temp: number;
    pressure: number;
  };
  name: string;
}
