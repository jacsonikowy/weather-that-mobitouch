import CityInput from "components/CityInput/CityInput";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";

import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import Weather from "components/Weather/Weather";
import FavoriteCity from "components/FavoriteCity/FavoriteCity";
import { setLoginAndPassword } from "features/login/login";
import Button from "components/Button/Button";
import { RootState } from "store";
import Modal from "components/Modal/Modal";
import { WeatherDataProps } from "constants/WeatherDataProps";
import { setFavoriteCity } from "features/favoriteCities/favoriteCities";
import { setIsCelsius } from "features/isCelsius/isCelsius";
import { useGetWeatherForecast } from "services/openweather";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetWeatherForecast({ lat: 0, lon: 0 });
  console.log(data);

  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const cityInModal = useSelector(
    (state: RootState) => state.cityInModal.cityInModal
  );
  const modalActive = useSelector(
    (state: RootState) => state.cityInModal.activeModal
  );

  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate("/");
    dispatch(
      setLoginAndPassword({
        login: "",
        password: "",
      })
    );
  };

  useEffect(() => {
    const favoriteCitiesLocalStorage = localStorage.getItem("favoriteCities");
    if (favoriteCitiesLocalStorage) {
      console.log(favoriteCitiesLocalStorage);
      const citiesArray = JSON.parse(favoriteCitiesLocalStorage);
      citiesArray.forEach((city: WeatherDataProps) => {
        dispatch(setFavoriteCity(city));
      });
    }
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <Button onClick={handleLogout} text="Log Out" />
      <Button
        onClick={() => dispatch(setIsCelsius(!celsius))}
        text={!celsius ? <Celsius /> : <Fahrenheit />}
        variant="secondary"
      />
      <div className={styles.weatherInfo}>
        <CityInput />
        <Weather />
      </div>
      <div className={styles.favorites}>
        {favoriteCities.map((favoriteCity: WeatherDataProps) => {
          return <FavoriteCity favoriteCity={favoriteCity} />;
        })}
      </div>
      {modalActive && cityInModal ? <Modal /> : ""}
    </div>
  );
};

export default Home;
