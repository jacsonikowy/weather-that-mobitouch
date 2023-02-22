import React, { useEffect, useState } from "react";
import styles from "./CityInput.module.scss";
import { useDebounce } from "hooks/UseDebounce";
import Button from "components/Button/Button";
import ListItem from "components/ListItem/ListItem";
import { fetchCityNameData } from "utils";

interface CityInputProps {
  setCityName: any;
}

const CityInput: React.FC<CityInputProps> = ({ setCityName }) => {
  const [cityInputName, setCityInputName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const debouncedValue = useDebounce<string>(cityInputName, 500);

  useEffect(() => {
    fetchCityNameData(debouncedValue).then((data) => {
      setWeatherData(data.data);
      console.log(data);
    });
  }, [debouncedValue]);

  return (
    <div className={styles.cityInputDiv}>
      <span className={styles.paragraph}>Type City</span>
      <div className={styles.wrapperInputAndBtn}>
        <input
          type="text"
          className={styles.inputCity}
          onChange={(e) => setCityInputName(e.target.value)}
        />
        {weatherData.map((city: any) => {
          return <ListItem text={city.name} />;
        })}
        <ListItem text={weatherData} />
        <div className={styles.wrapperBtn}>
          <Button
            onClick={() => setCityName(cityInputName)}
            text="Check Weather"
          />
        </div>
      </div>
    </div>
  );
};

export default CityInput;
