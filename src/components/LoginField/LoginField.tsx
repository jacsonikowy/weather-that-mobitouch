import React, { useState } from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";
import styles from "./LoginField.module.scss";

export interface LoginFieldProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
}

const LoginField = <T extends {}>(props: LoginFieldProps<T>) => {

  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState("")
  const { label, register, ...rest } = props;

  const handleTextChange = (text:string) => {
    setValue(text);
    console.log(text)

    if(text !== '') {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  return (
    <div className={styles.field}>
      <input {...rest} {...register(props.name)} onChange={e => {handleTextChange(e.target.value); /* props.onChange; -- Don't work with props.onChange, typescript unused expression error TODO*/}} />
      <label className={`${isActive ? styles.active : ""}`} htmlFor={props.name}>{label}</label>
    </div>
  );
};

export default LoginField;
