import React from 'react'
import Sidebar from 'components/Sidebar/Sidebar'
import styles from './Favorites.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FavoritePanel from 'components/FavoritePanel/FavoritePanel';
import Modal from 'components/Modal/Modal';

const Favorites: React.FC = () => {

    const favorites = useSelector((state: RootState) => state.favorites.favorites)
    const modalActive = useSelector((state: RootState) => state.cityInModal.activeModal)
    console.log(favorites)

    return (
        <div className={styles.favorites}>
            <Sidebar />
            <div className={styles.content}>
                {favorites.length === 0 ? "There are no Favorites!" : 
               <div className={styles.favoritePanels}>
                    <div>
                        <FavoritePanel name="Warsaw" weatherImg="10n" temp={10} pressure={997} />
                    </div>
                </div>
                }
            </div>
            {modalActive && <Modal />}
        </div>
    )
}

export default Favorites