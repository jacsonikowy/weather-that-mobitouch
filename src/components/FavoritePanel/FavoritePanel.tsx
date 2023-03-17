import React from 'react'
import styles from './FavoritePanel.module.scss'
import { FavoriteState } from 'constants/FavoriteState'
import { convertToFahrenheit, displayIcon } from 'utils'
import Button from 'components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { handleRemoveFromFavorites } from 'utils'
import { WeatherDataProps } from 'constants/WeatherDataProps'

interface FavoritePanelProps extends FavoriteState {
    onClick: () => void
    weatherData: WeatherDataProps
}


const FavoritePanel: React.FC<FavoritePanelProps> = ({name, weatherImg, temp, pressure, weatherData, onClick}) => {

    const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius)
    const favoriteCities = useSelector((state: RootState) => state.favorites.favorites)

    const dispatch = useDispatch();


    return (
        <tr className={styles.favoritePanel}>
            <td>
                <Button
                text={
                    <FontAwesomeIcon
                    icon={ faStar }
                    />
                }
                onClick={() =>
                    {
                    handleRemoveFromFavorites(dispatch, weatherData, favoriteCities)
                    }
                }
                />
            </td>
            <td className={styles.wrapperSvg}>
                {weatherImg ? displayIcon(weatherImg) : "" }
            </td>
            <td>{name}</td>
            <td>{celsius ? `${Math.round(temp)}°C` : `${convertToFahrenheit(temp)}°F`}</td>
            <td>{pressure} hPa</td>
            <Button text="See more" onClick={onClick}/>
        </tr>
    )
}

export default FavoritePanel