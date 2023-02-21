import React from "react";
import styles from "./FavoriteCity.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCloud } from "@fortawesome/free-solid-svg-icons";

interface FavoriteCityProps {
  cityName: string;
}

const FavoriteCity: React.FC<FavoriteCityProps> = ({ cityName }) => {
  return (
    <div className={styles.favoriteCity}>
      <div className={styles.title}>
        <span>{cityName}</span>
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div className={styles.informations}>
        <div>
          <FontAwesomeIcon icon={faCloud} />
          2C 998hPa
        </div>
      </div>
    </div>
  );
};

export default FavoriteCity;
