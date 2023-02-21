import React from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import styles from "./LoginField.module.scss";

type Login = {
  login: string;
  password: string;
};

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

export interface LoginFieldProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<Login>;
  label: string;
  register: UseFormRegister<Login>;
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
