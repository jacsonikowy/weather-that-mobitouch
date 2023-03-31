import React, { useState, useEffect } from "react";
import styles from "./CityInput.module.scss";
import { useDebounce } from "hooks/UseDebounce";
import ListItem from "components/ListItem/ListItem";

import { useDispatch } from "react-redux";
import { setCity } from "features/cities/weather";
import { StateProps } from "constants/StateProps";
import { ReactComponent as Glass } from "assets/icons/glass.svg";
import { useGetFavoriteCityQuery } from "services/getFavoriteCity";

const CityInput: React.FC = () => {
  const [cityInputName, setCityInputName] = useState("");
  const [cities, setCities] = useState<StateProps[]>([]);
  const debouncedValue = useDebounce<string>(cityInputName, 300);
  const dispatch = useDispatch();

  const handleDispatch = (city: StateProps) => {
    dispatch(setCity(city));
    setCityInputName("");
    setCities([]);
  };

  const { data, error, isLoading } = useGetFavoriteCityQuery(debouncedValue, {
    skip: debouncedValue.length === 0,
  });

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data]);

  return (
    <div className={styles.cityInputDiv}>
      <div className={styles.wrapperInputAndBtn}>
        <label htmlFor="">
          <Glass />
          <input
            type="text"
            className={styles.inputCity}
            onChange={(e) => setCityInputName(e.target.value)}
            value={cityInputName}
          />
        </label>
        {cities
          ? cities.length === 0
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
              })
          : ""}
      </div>
    </div>
  );
};

export default CityInput;
