import { createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../Features/slice/authSlice"; 
import { baseQuery } from "../Features/baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token is required");
        }

        return {
          url: "/user/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      transformResponse: (response) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.user }));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },
    }),

    // ✅ New endpoint to get user by ID
    getUserById: builder.query({
      query: (userId) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token is required");
        }

        return {
          url: `/user/${userId}`, // dynamic userId
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useFetchUserProfileQuery, useGetUserByIdQuery } = userApi;
