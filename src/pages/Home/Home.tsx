import CityInput from "components/CityInput/CityInput";
import React, { useEffect, useState } from "react";
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

const Home: React.FC = () => {
  const [celsius, setCelsius] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [cityInModal, setCityInModal] = useState<WeatherDataProps>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteCities = useSelector((state: RootState) => state.favorites);

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
      const citiesArray = JSON.parse(favoriteCitiesLocalStorage);
      citiesArray.forEach((city: WeatherDataProps) => {
        dispatch(setFavoriteCity(city));
      });
    }
  }, [dispatch]);

  if (localStorage.getItem("user") === "") {
    return <div>UNAUTHORIZED</div>;
  }

  return (
    <div className={styles.home}>
      <Button onClick={handleLogout} text="Log Out" />
      <Button
        onClick={() => setCelsius(!celsius)}
        text={!celsius ? <Celsius /> : <Fahrenheit />}
        variant="secondary"
      />
      <div className={styles.weatherInfo}>
        <CityInput />
        <Weather
          celsius={celsius}
          setModalActive={setModalActive}
          setCityInModal={setCityInModal}
        />
      </div>
      <div className={styles.favorites}>
        {favoriteCities.map((favoriteCity: WeatherDataProps) => {
          return (
            <FavoriteCity
              name={favoriteCity.name}
              weather={favoriteCity.weather}
              main={favoriteCity.main}
            />
          );
        })}
      </div>
      {modalActive && cityInModal ? (
        <Modal
          active={modalActive}
          cityInModal={cityInModal}
          setModalActive={setModalActive}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
