import { ReactComponent as Dashboard } from 'assets/icons/dashboard.svg'
import { ReactComponent as FavoritesIcon } from 'assets/icons/favorites.svg'
import { ReactComponent as Settings } from 'assets/icons/settings.svg'
import { ReactComponent as Logout } from 'assets/icons/logout.svg'
import { ItemProps } from 'constants/ItemProps'
import Home from 'pages/Home/Home'
import Favorites from 'pages/Favorites/Favorites'

export const sidebarData: ItemProps[] = [
    {
        img: <Dashboard />,
        text: "Dashboard",
        location: "/home"
    },
    {
        img: <FavoritesIcon />,
        text: "Favorites",
        location: "/favorites"
    }
]

export const sidebarDataSystem: ItemProps[] = [
    {
        img: <Settings />,
        text: "Settings"
    },
    {
        img: <Logout />,
        text: "Log Out",
        isLogout: true,
    }
]