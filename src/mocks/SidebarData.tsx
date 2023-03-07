import { ReactComponent as Dashboard } from 'assets/icons/dashboard.svg'
import { ReactComponent as Favorites } from 'assets/icons/favorites.svg'
import { ReactComponent as Settings } from 'assets/icons/settings.svg'
import { ReactComponent as Logout } from 'assets/icons/logout.svg'
import { ItemProps } from 'constants/ItemProps'

export const sidebarData: ItemProps[] = [
    {
        img: <Dashboard />,
        text: "Dashboard"
    },
    {
        img: <Favorites />,
        text: "Favorites",
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