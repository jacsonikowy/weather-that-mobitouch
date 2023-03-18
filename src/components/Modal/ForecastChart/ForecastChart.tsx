import React, { HTMLAttributes, useEffect, useState } from "react";
import styles from "./ForecastChart.module.scss";
import { WeatherDataProps } from "constants/WeatherDataProps";
import {
  convertToFahrenheit,
  convertUnixTime,
  fetch5Day3HourForecast,
} from "utils";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface ForecastChartProps extends HTMLAttributes<HTMLDivElement> {
  cityInModal: any;
}

const fetchDataForecast = async (
  cityInModal: WeatherDataProps,
  celsius: boolean
) => {
  const response = await fetch5Day3HourForecast(
    cityInModal.coord!.lat,
    cityInModal.coord!.lon
  );

  const data: ApexOptions = {
    chart: {
      id: "temperature",
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: response.slice(0, 40).map((object) => {
        return convertUnixTime(object.dt);
      }),
    },
    series: [
      {
        name: "Temperature",
        data: response.map((city) => {
          return celsius ? city.main.temp : convertToFahrenheit(city.main.temp);
        }),
      },
      {
        name: "Humidity",
        data: response.map((city) => {
          return city.main.humidity;
        }),
      },
    ],
  };

  console.log(data);

  return data;
};

const ForecastChart: React.FC<ForecastChartProps> = ({
  cityInModal,
  ...props
}) => {
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const [chartData, setChartData] = useState<ApexOptions>({
    chart: {
      id: "temperature",
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "2px",
        },
      },
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataForecast(cityInModal, celsius);
      setChartData(response);
    };

    fetchData();
  }, [cityInModal, celsius]);

  if (!chartData) {
    <div>Loading</div>;
  }

  return (
    <div className={styles.forecastChart}>
      <Chart
        className={styles.chart}
        options={chartData}
        series={chartData.series}
        type="line"
      />
    </div>
  );
};

export default ForecastChart;
