import React, { useState } from "react";
import styles from "./CityInput.module.scss";

interface CityInputProps {
  setCityName: any;
}

const CityInput: React.FC<CityInputProps> = ({ setCityName }) => {
  const [cityInputName, setCityInputName] = useState("");

  return (
    <div className={styles.cityInputDiv}>
      <span className={styles.paragraph}>Type City</span>
      <div className={styles.wrapperInputAndBtn}>
        <input
          type="text"
          className={styles.inputCity}
          onChange={(e) => setCityInputName(e.target.value)}
        />
        <div className={styles.wrapperBtn}>
          <button
            className={styles.cityNameBtn}
            onClick={(e) => setCityName(cityInputName)}
          >
            Check Weather
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityInput;
