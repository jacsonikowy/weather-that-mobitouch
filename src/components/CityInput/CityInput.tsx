import React from "react";
import styles from "./CityInput.module.scss";

const CityInput: React.FC = () => {
  return (
    <div className={styles.cityInput}>
      <h1>Type City</h1>
      <input type="text" className={styles.inputCity} />
    </div>
  );
};

export default CityInput;
