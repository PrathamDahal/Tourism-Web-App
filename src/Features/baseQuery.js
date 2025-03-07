import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://tourism.smartptrm.com/api/v1", // Replace with your API base URL
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken; // Adjust based on where your token is stored
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});