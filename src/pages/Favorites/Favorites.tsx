import React, { useEffect } from "react";
import Sidebar from "components/Sidebar/Sidebar";
import styles from "./Favorites.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "store";
import FavoritePanel from "components/FavoritePanel/FavoritePanel";
import Modal from "components/Modal/Modal";
import Button from "components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSidebarActive } from "features/sidebar/sidebar";
import {
  setCityInModal,
  setModalActive,
} from "features/cityInModal/cityInModal";
import { setFavoriteCityArray } from "features/favoriteCities/favoriteCities";
import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import { setIsCelsius } from "features/isCelsius/isCelsius";
import { ToastContainer } from "react-toastify";

const Favorites: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const modalActive = useSelector(
    (state: RootState) => state.cityInModal.activeModal
  );
  const cityInModal = useSelector(
    (state: RootState) => state.cityInModal.cityInModal
  );
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);

  const dispatch = useDispatch();

  useEffect(() => {
    const favoriteCitiesLocalStorage = localStorage.getItem("favoriteCities");
    if (favoriteCitiesLocalStorage) {
      const citiesArray = JSON.parse(favoriteCitiesLocalStorage);
      dispatch(setFavoriteCityArray(citiesArray));
    }
  }, []);

  return (
    <div className={styles.favorites}>
      <ToastContainer />
      <Sidebar />
      <div className={`${styles.closeBtnWrapper}`}>
        <Button
          text={<FontAwesomeIcon icon={faBars} />}
          onClick={() => dispatch(setSidebarActive(true))}
        ></Button>
      </div>
      <div className={styles.btnsWrapper}>
        <Button
          onClick={() => dispatch(setIsCelsius(!celsius))}
          text={!celsius ? <Celsius /> : <Fahrenheit />}
          variant="secondary"
        />
      </div>
      <div className={styles.content}>
        {favorites.length !== 0 ? (
          <div className={styles.favoritePanels}>
            {favorites.map((city) => {
              console.log(city);
              return (
                <FavoritePanel
                  name={city.name}
                  weatherImg={city.weather[0].icon}
                  pressure={city.main.pressure}
                  temp={city.main.temp}
                  weatherData={city}
                  onClick={() => {
                    dispatch(setCityInModal(city));
                    dispatch(setModalActive(true));
                  }}
                />
              );
            })}
          </div>
        ) : (
          <span>There are no favorites!</span>
        )}
      </div>
      {modalActive && cityInModal && <Modal />}
    </div>
  );
};

export default Favorites;
