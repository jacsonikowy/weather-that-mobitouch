import React, { useState } from "react";
import { sidebarData } from "mocks/SidebarData";
import { sidebarDataSystem } from "mocks/SidebarData";
import Item from "components/Item/Item";
import styles from "./Sidebar.module.scss"
import { logout } from "utils";
import { useNavigate } from "react-router";
import Button from "components/Button/Button"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {

    const [active, setActive] = useState(false);
    const navigate = useNavigate();



    return (
        <div className={`${styles.container} ${active ? "" : styles.nobackground}`}>
        <div className={`${styles.sidebar} ${active ? styles.active : ""}`}>
            <div className={styles.panels}>
                {sidebarData.map((item) => {
                    return (<Item img={item.img} text={item.text} onClick={() => {
                      if(!!item.location){
                        navigate(item.location)
                      }  
                    }}/>)
                })}
            </div>
            <div className={styles.panelsSystem}>
                <h5>System</h5>
                {sidebarDataSystem.map(item => {
                    return <Item img={item.img} text={item.text} isLogout={item.isLogout} onClick={item.isLogout ? () => logout(navigate) : undefined}/>
                })}
            </div>
        </div>
        <div className={styles.closeBtnWrapper}>
            <Button text={<FontAwesomeIcon icon={ active ? faX : faBars} />} onClick={() => setActive(!active)}></Button>
        </div> 
        </div>
    )
}

export default Sidebar