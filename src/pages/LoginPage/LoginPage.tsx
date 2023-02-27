import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import loginCredentials from "login.json";
import LoginField from "components/LoginField/LoginField";

import { useDispatch } from "react-redux";
import { setLoginAndPassword } from "features/login/login";

interface LoginValues {
  login: string;
  password: string;
}

const validationSchema = yup.object({
  login: yup.string().required("Required to login"),
  password: yup.string().required("Required to login"),
});

const LoginPage: React.FC = () => {
  const [credentialsCorrect, setCredentialsCorrect] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
      data.login === loginCredentials.login &&
      data.password === loginCredentials.password
    ) {
      dispatch(setLoginAndPassword(data));
      const userData = {
        login: data.login,
        password: data.password,
        loggedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("success");
      navigate("/home");
    } else {
      console.log("error");
      setCredentialsCorrect(false);
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
        />
        <p>{errors.login?.message ? errors.login?.message : null}</p>
        <LoginField
          type="password"
          register={register}
          name="password"
          label="Password"
        />
        <p>{errors.password?.message ? errors.password?.message : null}</p>
        <p>{!credentialsCorrect ? <div>Wrong Credentials</div> : ""}</p>
        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
