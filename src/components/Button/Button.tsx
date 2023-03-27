import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ReactComponent as Celsius } from "assets/icons/celsius.svg";
import { ReactComponent as Fahrenheit } from "assets/icons/fahrenheit.svg";
import { useDispatch } from "react-redux";
import { setIsCelsius } from "features/isCelsius/isCelsius";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string | React.ReactNode;
  variant?: "secondary" | "third" | "confirmation" | "danger";
}

const Button: React.FC<ButtonProps> = ({ text, variant, ...props }) => {
  const celsius = useSelector((state: RootState) => state.isCelsius.isCelsius);

  const dispatch = useDispatch();

  if (variant === "secondary") {
    const notifyChangeTemp = () => {
      toast(`Changed to ${celsius ? "Fahrenheit" : "Celsius"}`);
      dispatch(setIsCelsius(!celsius));
    };

    return (
      <button
        className={`${styles.button} ${styles.secondary} `}
        onClick={() => notifyChangeTemp()}
      >
        {celsius ? <Fahrenheit /> : <Celsius />}
      </button>
    );
  }

  return (
    <button
      className={`${styles.button} ${
        variant === "third"
          ? styles.third
          : variant === "confirmation"
          ? styles.confirmation
          : variant === "danger"
          ? styles.danger
          : ""
      }`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
