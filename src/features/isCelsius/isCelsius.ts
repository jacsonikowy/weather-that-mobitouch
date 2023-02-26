import { createSlice } from "@reduxjs/toolkit";

interface StateProps {
  isCelsius: boolean
}

const initialState: StateProps = {
  isCelsius: true
}

const IsCelsiusReducer = createSlice({
  name: "isCelsius",
  initialState,
  reducers: {
    setIsCelsius: (state: StateProps, { payload }) => {
      state.isCelsius = payload
    }
  }
});

export const { setIsCelsius } =
  IsCelsiusReducer.actions;
export default IsCelsiusReducer.reducer;
