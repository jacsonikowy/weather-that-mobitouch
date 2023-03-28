import React, { useState } from "react";
import styles from "./FavoritePanel.module.scss";
import { FavoriteState } from "constants/FavoriteState";
import {
  convertToFahrenheit,
  displayCurrentDayAndHour,
  displayIcon,
} from "utils";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { WeatherDataProps } from "constants/WeatherDataProps";
import { setConfirmationModalActive } from "features/confimationModal/confirmationModal";
import { AppDispatch } from "store";

interface FavoritePanelProps extends FavoriteState {
  onClick: () => void;
  weatherData: WeatherDataProps;
}

const FavoritePanel: React.FC<FavoritePanelProps> = ({
  name,
  weatherImg,
  temp,
  pressure,
  weatherData,
  onClick,
}) => {
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);

  const dispatch = useDispatch();

  return (
    <div className={styles.favoritePanel}>
      <div className={styles.wrapperFavoriteBtn}>
        <Button
          text={<FontAwesomeIcon icon={faStar} />}
          onClick={() => {
            dispatch(setConfirmationModalActive(true));
          }}
        />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.date}>{displayCurrentDayAndHour()}</div>
      <div className={styles.wrapperSvg}>
        {weatherImg ? displayIcon(weatherImg) : ""}
      </div>
      <div className={styles.temp}>
        {celsius ? `${Math.round(temp)}°C` : `${convertToFahrenheit(temp)}°F`}
      </div>
      <div className={styles.pressure}>{pressure} hPa</div>
      <div className={styles.wrapperSeeMoreBtn}>
        <Button variant="third" text="See more" onClick={onClick} />
      </div>
    </div>
  );
};

export default FavoritePanel;
