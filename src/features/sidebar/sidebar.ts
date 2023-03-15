import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    active: boolean
}

const initialState: SidebarState = {
    active: false
};

const SidebarSlice = createSlice({
  name: "sidebarActive",
  initialState,
  reducers: {
    setSidebarActive: (state: SidebarState, { payload }) => {
      state.active = payload;
    },
  },
});

export const { setSidebarActive } = SidebarSlice.actions;
export default SidebarSlice.reducer;
