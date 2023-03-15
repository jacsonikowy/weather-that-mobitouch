import React, { useState } from "react";
import { sidebarData } from "mocks/SidebarData";
import { sidebarDataSystem } from "mocks/SidebarData";
import Item from "components/Item/Item";
import styles from "./Sidebar.module.scss"
import { logout } from "utils";
import { useNavigate } from "react-router";
import Button from "components/Button/Button"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { setSidebarActive } from "features/sidebar/sidebar";
import { useDispatch } from "react-redux";
import { ItemProps } from "constants/ItemProps";

const Sidebar: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sidebarActive = useSelector(
        (state: RootState) => state.sidebar.active
    )

    return (
        <div className={`${styles.sidebar} ${sidebarActive ? styles.active : ""}`}>
            <div className={styles.btnWrapper}>
                <Button text={<FontAwesomeIcon icon={ faX } />} onClick={() => dispatch(setSidebarActive(!sidebarActive))}/>
            </div>
            <div className={styles.panels}>
                {sidebarData.map((item) => {
                    return (<Item img={item.img} text={item.text} onClick={() => {
                      if(!!item.location){
                        navigate(item.location)
                      }
                      dispatch(setSidebarActive(!sidebarActive))
                    }}/>)
                })}
            </div>
            <div className={styles.panelsSystem}>
                <h5>System</h5>
                {sidebarDataSystem.map(item => {
                    return <Item img={item.img} text={item.text} isLogout={item.isLogout} onClick={item.isLogout ? () => logout(navigate) : undefined} />
                })}
            </div>
        </div>
    )
}

export default Sidebar