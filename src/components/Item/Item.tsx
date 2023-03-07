import React, { useEffect } from "react";
import styles from './Item.module.scss'
import { ItemProps } from "constants/ItemProps";


const Item: React.FC<ItemProps> = ({img, text, isLogout, ...props}) => {

    return (
        <button className={`${styles.item} ${isLogout ? styles.logout : ""}`} {...props}>
            {img}
            <p className={styles.text}>{text}</p>
        </button>
    )
}

export default Item