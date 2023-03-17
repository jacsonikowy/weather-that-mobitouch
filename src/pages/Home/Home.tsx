import CityInput from "components/CityInput/CityInput";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.scss";

import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import Weather from "components/Weather/Weather";
import Button from "components/Button/Button";
import { RootState } from "store";
import Modal from "components/Modal/Modal";
import { setFavoriteCityArray } from "features/favoriteCities/favoriteCities";
import { setIsCelsius } from "features/isCelsius/isCelsius";
import Sidebar from "components/Sidebar/Sidebar";
import { returnCurrentDate } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { setSidebarActive } from "features/sidebar/sidebar";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);
  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const cityInModal = useSelector(
    (state: RootState) => state.cityInModal.cityInModal
  );
  const modalActive = useSelector(
    (state: RootState) => state.cityInModal.activeModal
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
      <Sidebar/>
      <div className={`${styles.closeBtnWrapper}`}>
          <Button text={<FontAwesomeIcon icon={ faBars }/>} onClick={() => dispatch(setSidebarActive(true))}></Button>
      </div> 
      <div className={styles.content}>
        <div className={styles.btnsWrapper}>
          <Button
            onClick={() => dispatch(setIsCelsius(!celsius))}
            text={!celsius ? <Celsius /> : <Fahrenheit />}
            variant="secondary"
          />
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

        </div>
    </div>
  );
};

export default Home;
