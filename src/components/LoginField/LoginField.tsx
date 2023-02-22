import React from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import styles from "./LoginField.module.scss";

export interface LoginFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
}

const LoginField = <T extends {}>(props: LoginFieldProps<T>) => {
  const { label, register, ...rest } = props;
  return (
    <div className={styles.field}>
      <label htmlFor={props.name}>{label}</label>
      <input {...rest} {...register(props.name)} onChange={props.onChange} />
    </div>
  );
};

export default LoginField;
