import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "../Services/auth/authApiSlice";
import { userApi } from '../Services/auth/userApiSlice';
import { resetPasswordApi } from "../Services/auth/resetPasswordApi";
import { protectedApi } from "../Services/auth/admin-authApi";
import authReducer from "../Features/slice/authSlice";
import { siteSettingsApi } from './../Services/auth/SiteSettingApi';
import { categoryApi } from "../Services/auth/categoryApiSlice";
import { productApi } from "../Services/auth/productApiSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
    [protectedApi.reducerPath]: protectedApi.reducer,
    [siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware, 
      userApi.middleware,
      protectedApi.middleware,
      resetPasswordApi.middleware,
      siteSettingsApi.middleware,
      categoryApi.middleware,
      productApi.middleware
    ),
});

export default store;
