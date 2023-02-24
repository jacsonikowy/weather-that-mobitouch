import { WeatherDataProps } from "constants/WeatherDataProps";
import React from "react";
import styles from "./Modal.module.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button/Button";

interface ModalProps {
  active: boolean;
  cityInModal: WeatherDataProps;
  setModalActive: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Modal: React.FC<ModalProps> = ({
  active,
  cityInModal,
  setModalActive,
}) => {
  return (
    <div className={`${styles.modal} ${active ? styles.active : ""}`}>
      <div className={styles.wrapperBtn}>
        <Button
          text={
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                setModalActive(false);
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
        <p>{cityInModal.main.temp}</p>
      </div>
    </div>
  );
};

export default Modal;
