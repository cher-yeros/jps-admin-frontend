import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    sidebar: true,
    active: 0,
  },
  reducers: {
    controlSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    setActiveLink(state, action) {
      state.active = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { controlSidebar, setActiveLink } = systemSlice.actions;

export default systemSlice.reducer;
