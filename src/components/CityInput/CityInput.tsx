import React, { useEffect, useState } from "react";
import styles from "./CityInput.module.scss";
import { useDebounce } from "hooks/UseDebounce";
import ListItem from "components/ListItem/ListItem";
import { fetchCityNameData } from "utils";

import { useDispatch } from "react-redux";
import { setCity } from "features/cities/weather";
import { StateProps } from "constants/StateProps";
import { ReactComponent as Glass } from 'assets/icons/glass.svg'

const CityInput: React.FC = () => {
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

    const fetchData = async () => {
      const response = await fetchCityNameData(debouncedValue);
      setCities(response);
    };

    fetchData();
  }, [debouncedValue]);

  return (
    <div className={styles.cityInputDiv}>
      <div className={styles.wrapperInputAndBtn}>
        <label htmlFor="">
          <Glass />
          <input
            type="text"
            className={styles.inputCity}
            onChange={(e) => setCityInputName(e.target.value)}
            placeholder="Type city here..."
            value={cityInputName}
          />
        </label>
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
