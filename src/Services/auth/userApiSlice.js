import { createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../Features/slice/authSlice"; // Import setCredentials action
import { baseQuery } from '../../Features/baseQuery';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (credentials) => {
        // Make sure accessToken is present
        if (!credentials || !credentials.accessToken) {
          throw new Error("Access token is required");
        }
        return {
          url: "/user/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${credentials.accessToken}`, // Passing accessToken in headers
          },
        };
      },
      transformResponse: (response) => response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch (error) {
          console.error("Fetch user profile error:", error);
        }
      },
    }),
  }),
});

export const { useFetchUserProfileQuery } = userApi;
