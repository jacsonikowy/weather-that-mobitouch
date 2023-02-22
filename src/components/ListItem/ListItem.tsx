import React from "react";
import styles from "./ListItem.module.scss";

interface ListItemProps {
  text: any;
}

const ListItem: React.FC<ListItemProps> = ({ text }) => {
  return <div className={styles.listItem}>{text}</div>;
};

export default ListItem;
