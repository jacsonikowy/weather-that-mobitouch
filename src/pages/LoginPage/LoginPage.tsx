import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "react-router";

import loginCredentials from "login.json";
import LoginField, { LoginFieldProps } from "components/Field/LoginField";

interface LoginValues {
  login: string;
  password: string;
}

const validationSchema = yup.object({
  login: yup.string().required("Required to login"),
  password: yup.string().required("Required to login"),
});

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    if (
      login !== loginCredentials.login ||
      password !== loginCredentials.password ||
      (login !== loginCredentials.login &&
        password !== loginCredentials.password)
    ) {
      console.log("error");
    } else {
      console.log("success");
    }
  });

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <LoginField
          type="text"
          register={register}
          name="login"
          label="Login"
          onChange={(e) => setLogin(e.target.value)}
        />
        <p>{errors.login?.message ? errors.login?.message : null}</p>
        <LoginField
          type="password"
          register={register}
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{errors.password?.message ? errors.password?.message : null}</p>
        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
