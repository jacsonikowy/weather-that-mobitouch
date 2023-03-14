import React, { ButtonHTMLAttributes } from "react";

export interface ItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    img: React.ReactNode,
    text: string,
    isLogout?: boolean,
    location?: "/home" | "/favorites"
    logoutFunction?: Function
}