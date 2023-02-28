import React from "react";
import styles from "./Modal.module.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button/Button";
import { showFahrenheitOrCelsius } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ForecastChart from "./ForecastChart/ForecastChart";
import { setModalActive } from "features/cityInModal/cityInModal";

const Modal: React.FC = () => {
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const cityInModal = useSelector(
    (state: RootState) => state.cityInModal.cityInModal
  );
  const modalActive = useSelector(
    (state: RootState) => state.cityInModal.activeModal
  );

  const dispatch = useDispatch();

  return (
    <div className={`${styles.modal} ${modalActive ? styles.active : ""}`}>
      <div className={styles.wrapperBtn}>
        <Button
          text={
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                dispatch(setModalActive(false));
              }}
            />
          }
        />
      </div>
      <div className={styles.modalContent}>
        <h2>{cityInModal.name}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${cityInModal.weather[0].icon}@4x.png`}
          alt="Weather"
        />

        <h6>Temperature: </h6>
        <p>{showFahrenheitOrCelsius(cityInModal.main.temp, celsius)}</p>

        <h6>Feels Like:</h6>
        <p>{showFahrenheitOrCelsius(cityInModal.main.feels_like, celsius)}</p>

        <h6>Pressure:</h6>
        <p>{cityInModal.main.pressure} hPa</p>

        <h6>Max Temperature in 24H:</h6>
        <p>{showFahrenheitOrCelsius(cityInModal.main.temp_max, celsius)}</p>

        <h6>Min Temperature in 24H:</h6>
        <p>{showFahrenheitOrCelsius(cityInModal.main.temp_min, celsius)}</p>

        <h6>Humidity:</h6>
        <p>{cityInModal.main.humidity}%</p>

        <h6>Wind:</h6>
        <p>{cityInModal.wind.speed} m/s</p>
        <ForecastChart
          className={styles.forecastChart}
          cityInModal={cityInModal}
        />
      </div>
    </div>
  );
};

export default Modal;
