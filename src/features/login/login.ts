import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  login: string;
  password: string;
}

const initialState: LoginState = {
  login: "",
  password: "",
};

const LoginSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLoginAndPassword: (state: LoginState, { payload }) => {
      state.login = payload.login;
      state.password = payload.password;
    },
  },
});

export const { setLoginAndPassword } = LoginSlice.actions;
export default LoginSlice.reducer;
