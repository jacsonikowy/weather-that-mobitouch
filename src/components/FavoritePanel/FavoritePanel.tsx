import React from "react";
import styles from "./FavoritePanel.module.scss";
import { FavoriteState } from "constants/FavoriteState";
import { convertToFahrenheit, displayIcon } from "utils";
import Button from "components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { handleRemoveFromFavorites } from "utils";
import { WeatherDataProps } from "constants/WeatherDataProps";
import { toast } from "react-toastify";

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
  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const dispatch = useDispatch();
  const notifyRemoveFromFavorites = () =>
    toast("Successfully removed from Favorites");

  return (
    <div className={styles.favoritePanel}>
      <div className={styles.wrapperFavoriteBtn}>
        <Button
          text={<FontAwesomeIcon icon={faStar} />}
          onClick={() => {
            handleRemoveFromFavorites(dispatch, weatherData, favoriteCities);
            notifyRemoveFromFavorites();
          }}
        />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.date}>Monday, 12:00 AM</div>
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
