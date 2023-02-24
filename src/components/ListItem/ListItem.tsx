import React, { ButtonHTMLAttributes } from "react";
import styles from "./ListItem.module.scss";

interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  country: string;
}

const ListItem: React.FC<ListItemProps> = ({ text, country, ...props }) => {
  return (
    <div className={styles.listItem}>
      <p>{text}</p>
      <div className={styles.listItemEnd}>
        <p>{country}</p>
        <button {...props} />
      </div>
    </div>
  );
};

export default ListItem;
