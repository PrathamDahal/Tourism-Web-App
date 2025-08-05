import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../Features/baseQuery"; // Import the custom baseQuery
import { setCredentials, logout } from "../../Features/slice/authSlice"; // Import Redux actions

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery, // Use the custom baseQuery
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        // Assume response includes accessToken, refreshToken, and user
        const { accessToken, refreshToken, user } = response;
        return { accessToken, refreshToken, user };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Save tokens + user in redux
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: data.user,
            })
          );
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch (error) {
          console.error("Login error:", error.message || error);
        }
      },
    }),

    // Refresh token endpoint
    refreshToken: builder.mutation({
      query: () => ({
        url: "/token/refreshToken", // Specific endpoint for refreshing the token
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          // Get the current refreshToken from the Redux store
          const refreshToken = getState().auth.refreshToken;
          // Dispatch the setCredentials action to update the Redux store
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: refreshToken,
            })
          );
        } catch (error) {
          console.error("Refresh token error:", error.message || error);
          // Logout the user if the refresh token fails
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApiSlice;
