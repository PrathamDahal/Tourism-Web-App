import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, 
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true; 
    },
    setRole: (state, action) => {
      state.role = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
