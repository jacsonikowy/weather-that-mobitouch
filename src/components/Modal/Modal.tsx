import React from "react";
import styles from "./Modal.module.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button/Button";
import { displayIcon, showFahrenheitOrCelsius } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ForecastChart from "./ForecastChart/ForecastChart";
import { setModalActive } from "features/cityInModal/cityInModal";
import PanelModal from "./PanelModal/PanelModal";
import { ReactComponent as Wind } from 'assets/icons/Wind.svg'
import { ReactComponent as Thermo } from 'assets/icons/Thermo.svg'
import { ReactComponent as FeelsLike } from 'assets/icons/FeelsLike.svg'
import { ReactComponent as Pressure } from 'assets/icons/Pressure.svg'
import { ReactComponent as Humidity } from 'assets/icons/Humidity.svg'

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
        <div className={styles.weatherIcon}>
          {displayIcon(cityInModal.weather[0].icon)}
        </div>

        <PanelModal text="Temperature" value={`${showFahrenheitOrCelsius(cityInModal.main.temp, celsius)}`} icon={<Thermo />} />
        <PanelModal text="Feels Like" value={`${showFahrenheitOrCelsius(cityInModal.main.feels_like, celsius)}`} icon={<FeelsLike />} />
        <PanelModal text="Pressure" value={`${cityInModal.main.pressure} hPa`} icon={<Pressure />} />
        <PanelModal text="Max Temperature in 24H" value={`${showFahrenheitOrCelsius(cityInModal.main.temp_max, celsius)}`} icon={<Thermo />} />
        <PanelModal text="Min Temperature in 24H" value={`${showFahrenheitOrCelsius(cityInModal.main.temp_min, celsius)}`} icon={<Thermo />} />
        <PanelModal text="Humidity" value={`${cityInModal.wind.speed}%`} icon={<Humidity />} />
        <PanelModal text="Wind" value={`${cityInModal.wind.speed} m/s`} icon={<Wind />} />

        <ForecastChart
          className={styles.forecastChart}
          cityInModal={cityInModal}
        />
      </div>
    </div>
  );
};

export default Modal;
