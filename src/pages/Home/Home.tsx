import CityInput from "components/CityInput/CityInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";
import Weather from "components/Weather/Weather";
import Button from "components/Button/Button";

import Modal from "components/Modal/Modal";
import { setFavoriteCityArray } from "features/favoriteCities/favoriteCities";
import Sidebar from "components/Sidebar/Sidebar";
import { returnCurrentDate } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { setSidebarActive } from "features/sidebar/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "components/ConfirmationModal/ConfirmationModal";
import { useGetWeatherForecastQuery } from "services/getWeatherForecast";
import { RootState } from "store";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetWeatherForecastQuery({
    lat: 0,
    lon: 0,
  });

  console.log(data);

  const cityInModal = useSelector(
    (state: RootState) => state.cityInModal.cityInModal
  );
  const modalActive = useSelector(
    (state: RootState) => state.cityInModal.activeModal
  );
  const confirmationModalActive = useSelector(
    (state: RootState) => state.confirmationModalActive.confirmationModalActive
  );

  useEffect(() => {
    const favoriteCitiesLocalStorage = localStorage.getItem("favoriteCities");
    if (favoriteCitiesLocalStorage) {
      console.log(favoriteCitiesLocalStorage);
      const citiesArray = JSON.parse(favoriteCitiesLocalStorage);
      dispatch(setFavoriteCityArray(citiesArray));
    }
  }, []);

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={`${styles.closeBtnWrapper}`}>
        <Button
          text={<FontAwesomeIcon icon={faBars} />}
          onClick={() => {
            dispatch(setSidebarActive(true));
          }}
        ></Button>
      </div>
      <div className={styles.content}>
        <div className={styles.btnsWrapper}>
          <Button variant="secondary" />
        </div>
        <div className={styles.date}>
          <h3>{returnCurrentDate().title}</h3>
          <h5>{returnCurrentDate().subtitle}</h5>
        </div>
        <div className={styles.weatherInfo}>
          <CityInput />
          <Weather />
        </div>
        {modalActive && cityInModal && <Modal />}
        {confirmationModalActive && <ConfirmationModal />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
