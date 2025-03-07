import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "../Services/auth/authApiSlice";
import { userApi } from '../Services/auth/userApiSlice';
import { resetPasswordApi } from "../Services/auth/resetPasswordApi";
import { protectedApi } from "../Services/auth/admin-authApi";
import authReducer from "../Features/slice/authSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
    [protectedApi.reducerPath]: protectedApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, userApi.middleware,protectedApi.middleware),
});

export default store;
