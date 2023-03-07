import React, { useState } from "react";
import { sidebarData } from "mocks/SidebarData";
import { sidebarDataSystem } from "mocks/SidebarData";
import Item from "components/Item/Item";
import styles from "./Sidebar.module.scss"
import { logout } from "utils";
import { useNavigate } from "react-router";

const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.panels}>
                {sidebarData.map((item) => {
                    return (<Item img={item.img} text={item.text} />)
                })}
            </div>
            <div className={styles.panelsSystem}>
                <h5>System</h5>
                {sidebarDataSystem.map(item => {
                    return <Item img={item.img} text={item.text} isLogout={item.isLogout} onClick={item.isLogout ? () => logout(navigate) : undefined}/>
                })}
            </div>
        </div>
    )
}

export default Sidebar