import React from 'react'
import styles from './FavoritePanel.module.scss'
import { FavoriteState } from 'constants/FavoriteState'
import { displayIcon } from 'utils'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { setModalActive } from 'features/cityInModal/cityInModal'


const FavoritePanel: React.FC<FavoriteState> = ({name, weatherImg, temp, pressure}) => {

    const dispatch = useDispatch();

    return (
        <div className={styles.favoritePanel}>
            <div className={styles.wrapperSvg}>
                {weatherImg ? displayIcon(weatherImg) : "" }
            </div>
            <span>{name}</span>
            <span>{temp} C</span>
            <span>{pressure} hPa</span>
            <Button text="See more" onClick={() => {dispatch(setModalActive(true))}}/>
        </div>
    )
}

export default FavoritePanel