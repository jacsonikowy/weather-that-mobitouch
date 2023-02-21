import CityInput from "components/CityInput/CityInput";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.scss";

import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import Weather from "components/Weather/Weather";
import FavoriteCity from "components/FavoriteCity/FavoriteCity";

const Home: React.FC = () => {
  const [celsius, setCelsius] = useState(true);
  const [cityName, setCityName] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("user", "");
    navigate("/");
  };

  if (localStorage.getItem("user") === "") {
    return <div>UNAUTHORIZED</div>;
  }

  return (
    <div className={styles.home}>
      <div>
        <button onClick={handleLogout}>Log Out</button>
        <button
          className={styles.temperatureBtn}
          onClick={() => setCelsius(!celsius)}
        >
          {celsius ? <Celsius /> : <Fahrenheit />}
        </button>
      </div>
      <div className={styles.weatherInfo}>
        <CityInput setCityName={setCityName} />
        <Weather cityName={cityName} />
      </div>
      <div className={styles.favorites}>
        <FavoriteCity cityName="Warsaw" />
      </div>
    </div>
  );
};

export default Home;
