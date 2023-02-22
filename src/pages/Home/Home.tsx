import CityInput from "components/CityInput/CityInput";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import styles from "./Home.module.scss";

import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import Weather from "components/Weather/Weather";
import FavoriteCity from "components/FavoriteCity/FavoriteCity";
import { setLoginAndPassword } from "features/login/login";
import Button from "components/Button/Button";

const Home: React.FC = () => {
  const [celsius, setCelsius] = useState(true);
  const [cityName, setCityName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <CityInput setCityName={setCityName} />
        <Weather cityName={cityName} celsius={celsius} />
      </div>
      <div className={styles.favorites}>
        <FavoriteCity cityName="Warsaw" />
      </div>
    </div>
  );
};

export default Home;
