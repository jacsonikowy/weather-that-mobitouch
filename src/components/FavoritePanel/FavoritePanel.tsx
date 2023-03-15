import React from 'react'
import styles from './FavoritePanel.module.scss'
import { FavoriteState } from 'constants/FavoriteState'
import { displayIcon } from 'utils'
import Button from 'components/Button/Button'
import { useDispatch } from 'react-redux'
import { setModalActive } from 'features/cityInModal/cityInModal'

interface FavoritePanelProps extends FavoriteState {
    onClick: () => void
}


const FavoritePanel: React.FC<FavoritePanelProps> = ({name, weatherImg, temp, pressure, onClick}) => {

    const dispatch = useDispatch();

    return (
        <div className={styles.favoritePanel}>
            <div className={styles.wrapperSvg}>
                {weatherImg ? displayIcon(weatherImg) : "" }
            </div>
            <span>{name}</span>
            <span>{temp} C</span>
            <span>{pressure} hPa</span>
            <Button text="See more" onClick={onClick}/>
        </div>
    )
}

export default FavoritePanel