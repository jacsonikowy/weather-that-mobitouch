export interface ForecastState {
  list: [
    {
      dt: number;
      main: {
        temp: number;
        pressure: number;
        humidity: number;
      };
    }
  ];
}
