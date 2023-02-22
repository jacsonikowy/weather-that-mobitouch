import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  variant?: "secondary";
}

const Button: React.FC<ButtonProps> = ({ text, variant, ...props }) => {
  return (
    <button className={`${styles.button} ${variant}`} {...props}>
      {text}
    </button>
  );
};

export default Button;
