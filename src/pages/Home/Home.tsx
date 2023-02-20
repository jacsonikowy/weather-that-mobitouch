import CityInput from "components/CityInput/CityInput";
import React, { useState } from "react";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const [celsius, setCelsius] = useState(true);

  return (
    <div className={styles.home}>
      <button onClick={() => setCelsius(!celsius)}>
        {celsius ? "Celsius" : "Fahrenheit"}
      </button>
      <CityInput />
    </div>
  );
};

export default Home;
