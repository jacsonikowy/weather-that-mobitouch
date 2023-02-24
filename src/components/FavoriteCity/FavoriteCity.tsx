import React from "react";
import styles from "./FavoriteCity.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { WeatherDataProps } from "constants/WeatherDataProps";

const FavoriteCity: React.FC<WeatherDataProps> = ({ name, weather, main }) => {
  return (
    <div className={styles.favoriteCity}>
      <div className={styles.title}>
        <span>{name}</span>
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div className={styles.informations}>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt="weatherIcon"
        />
        {main.temp}&deg;C {main.pressure}
      </div>
    </div>
  );
};

export default FavoriteCity;
