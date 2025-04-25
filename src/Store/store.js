import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "../Services/auth/authApiSlice";
import { userApi } from '../Services/userApiSlice';
import { resetPasswordApi } from "../Services/resetPasswordApi";
import { protectedApi } from "../Services/auth/admin-authApi";
import authReducer from "../Features/slice/authSlice";
import { siteSettingsApi } from '../Services/SiteSettingApi';
import { categoryApi } from "../Services/categoryApiSlice";
import { productApi } from "../Services/productApiSlice";
import { registerApiSlice } from "../Services/registerApiSlice";
import { cartApi } from "../Services/cartSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
    [protectedApi.reducerPath]: protectedApi.reducer,
    [siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [registerApiSlice.reducerPath]: registerApiSlice.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
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
      productApi.middleware,
      registerApiSlice.middleware,
      cartApi.middleware
    ),
});

export default store;
