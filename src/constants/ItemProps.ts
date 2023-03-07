import { ButtonHTMLAttributes } from "react";

export interface ItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    img: React.ReactNode,
    text: string,
    isLogout?: boolean,
    logoutFunction?: Function
}