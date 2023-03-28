import React, { useState } from "react";
import styles from "./CityInput.module.scss";
import { useDebounce } from "hooks/UseDebounce";
import ListItem from "components/ListItem/ListItem";

import { useDispatch } from "react-redux";
import { setCity } from "features/cities/weather";
import { StateProps } from "constants/StateProps";
import { useGetFavoriteCityQuery } from "services/getFavoriteCity";

const CityInput: React.FC = () => {
  const [cityInputName, setCityInputName] = useState("");
  const debouncedValue = useDebounce<string>(cityInputName, 300);
  const dispatch = useDispatch();

  const handleDispatch = (city: StateProps) => {
    dispatch(setCity(city));
    setCityInputName("");
  };

  const { data, error, isLoading } = useGetFavoriteCityQuery(debouncedValue, {
    skip: debouncedValue.length === 0,
  });

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
        {data
          ? data.length === 0
            ? ""
            : data.map((city: StateProps, index: number) => {
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
