import React, { HTMLAttributes, useEffect, useState } from "react";
import "chart.js/auto";
import type { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import { WeatherDataProps } from "constants/WeatherDataProps";
import {
  convertToFahrenheit,
  convertUnixTime,
  fetch5Day3HourForecast,
} from "utils";
import { useSelector } from "react-redux";
import { RootState } from "store";
import styles from "../Modal.module.scss";

interface ForecastChartProps extends HTMLAttributes<HTMLDivElement> {
  cityInModal: WeatherDataProps;
}

const fetchDataForecast = async (
  cityInModal: WeatherDataProps,
  celsius: boolean
) => {
  const response = await fetch5Day3HourForecast(
    cityInModal.coord!.lat,
    cityInModal.coord!.lon
  );

  const data: ChartData<"line"> = {
    labels: response.slice(0, 40).map((object) => {
      return convertUnixTime(object.dt);
    }),
    datasets: [
      {
        label: "Temperature",
        data: response.map((city) => {
          return celsius ? city.main.temp : convertToFahrenheit(city.main.temp);
        }),
        tension: 0.5,
      },
      {
        label: "Humidity",
        data: response.map((city) => {
          return city.main.humidity;
        }),
        tension: 0.5,
      },
    ],
  };

  console.log(data);

  return data;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Forecast 3 Days",
    },
  },
};

const ForecastChart: React.FC<ForecastChartProps> = ({
  cityInModal,
  ...props
}) => {
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      setChartData(await fetchDataForecast(cityInModal, celsius));
    };

    fetchData();
  }, [cityInModal, celsius]);

  if (!chartData) {
    <div>Loading</div>;
  }

  return (
    <div className={styles.forecastChart}>
      <Line data={chartData} options={options}></Line>
    </div>
  );
};

export default ForecastChart;
