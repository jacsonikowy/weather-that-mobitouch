import React from "react";
import {
  UseFormRegister,
  Path,
  FieldValues,
  FieldError,
} from "react-hook-form";
import "./LoginField.module.scss";

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
    <div className="field">
      <label htmlFor={props.name}>{label}</label>
      <input {...rest} {...register(props.name)} onChange={props.onChange} />
    </div>
  );
};

export default LoginField;
