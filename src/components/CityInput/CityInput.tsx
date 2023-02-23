import React, { useEffect, useState } from "react";
import styles from "./CityInput.module.scss";
import { useDebounce } from "hooks/UseDebounce";
import ListItem from "components/ListItem/ListItem";
import { fetchCityNameData } from "utils";

import { useDispatch } from "react-redux";
import { setCity } from "features/cities/weather";

interface CityInputProps {
  setCityName: any;
}

type StateProps = {
  name: string;
  local_names: {
    en: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
};

const CityInput: React.FC<CityInputProps> = ({ setCityName }) => {
  const [cityInputName, setCityInputName] = useState("");
  const [cities, setCities] = useState<StateProps[]>([]);
  const debouncedValue = useDebounce<string>(cityInputName, 300);
  const dispatch = useDispatch();

  const handleDispatch = (city: StateProps) => {
    dispatch(setCity(city));
    setCityInputName("");
  };

  useEffect(() => {
    if (debouncedValue === "") {
      setCities([]);
    }

    fetchCityNameData(debouncedValue).then((data) => {
      console.log(data);
      setCities(data);
      return data;
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
          value={cityInputName}
        />
        {cities.length === 0
          ? ""
          : cities.map((city: StateProps, index: number) => {
              return (
                <ListItem
                  key={index}
                  text={city.name}
                  country={city.country}
                  onClick={() => {
                    handleDispatch(city);
                  }}
                />
              );
            })}
      </div>
    </div>
  );
};

export default CityInput;
