import { ReactComponent as Sun } from 'assets/icons/sun.svg'
import { ReactComponent as FewClouds } from 'assets/icons/fewClouds.svg'
import { ReactComponent as ScatteredClouds } from 'assets/icons/scatteredClouds.svg'
import { ReactComponent as ShowerRain } from 'assets/icons/showerRain.svg'
import { ReactComponent as Rain } from 'assets/icons/rain.svg'
import { ReactComponent as Thunderstorm } from 'assets/icons/thunderstorm.svg'
import { ReactComponent as Snow } from 'assets/icons/snow.svg'
import { ReactComponent as MistDay } from 'assets/icons/mistDay.svg'
import { ReactComponent as MistNight } from 'assets/icons/mistNight.svg'
import { ReactComponent as Night } from 'assets/icons/nightClearSky.svg'
import { ReactComponent as NightFewClouds } from 'assets/icons/nightFewClouds.svg'

interface IconProps {
    id: string | string[],
    icon: React.ReactNode
}

export const icons: IconProps[] = [
    {
        id: "01d",
        icon: <Sun />
    },
    {
        id: "01n",
        icon: <Night />
    },
    {
        id: "02d",
        icon: <FewClouds />
    },
    {
        id: "02n",
        icon: <NightFewClouds />
    },
    {
        id: ["03d", "03n", "04d", "04n"],
        icon: <ScatteredClouds />
    },
    {
        id: ["09d", "09n", "10n"],
        icon: <ShowerRain />
    },
    {
        id: "10d",
        icon: <Rain />
    },
    {
        id: ["11d", "11n"],
        icon: <Thunderstorm />
    },
    {
        id: ["13d", "13n"],
        icon: <Snow /> 
    },
    {
        id: "50d",
        icon: <MistDay />
    },
    {
        id: "50n",
        icon: <MistNight />
    }
]