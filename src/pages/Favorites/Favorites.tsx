import React, { useEffect, useState } from 'react'
import Sidebar from 'components/Sidebar/Sidebar'
import styles from './Favorites.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FavoritePanel from 'components/FavoritePanel/FavoritePanel';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { setSidebarActive } from 'features/sidebar/sidebar';
import { fetchWeatherData } from 'utils';
import { WeatherDataProps } from 'constants/WeatherDataProps';
import cityInModal, { setCityInModal, setModalActive } from 'features/cityInModal/cityInModal';

const Favorites: React.FC = () => {

    const [weatherData, setWeatherData] = useState<WeatherDataProps>();

    const favorites = useSelector((state: RootState) => state.favorites.favorites)
    const modalActive = useSelector((state: RootState) => state.cityInModal.activeModal)
    const city = useSelector((state: RootState) => state.cityProps.cityProps);
    const cityInModal = useSelector((state: RootState) => state.cityInModal.cityInModal)

    const dispatch = useDispatch();

    return (
        <div className={styles.favorites}>
            <Sidebar />
            <div className={`${styles.closeBtnWrapper}`}>
                <Button text={<FontAwesomeIcon icon={ faBars }/>} onClick={() => dispatch(setSidebarActive(true))}></Button>
            </div> 
            <div className={styles.content}>
                {favorites.length === 0 ? <span>There are no Favorites!</span> : 
               <div className={styles.favoritePanels}>
                    <div>

                        {favorites.map(city => {
                            console.log(city)
                            return <FavoritePanel name={city.name} weatherImg={city.weather[0].icon} pressure={city.main.pressure} temp={city.main.temp} onClick={() =>{
                             dispatch(setCityInModal(city))   
                             dispatch(setModalActive(true))
                            }}/>
                        })}

                    </div>
                </div>
                }
            </div>
            {modalActive && cityInModal && <Modal />}
        </div>
    )
}

export default Favorites