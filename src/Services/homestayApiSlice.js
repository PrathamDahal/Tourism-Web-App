import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./../Features/baseQuery";

export const homestayApi = createApi({
  reducerPath: "homestayApi",
  baseQuery,
  endpoints: (builder) => ({
    getHomestays: builder.query({
      query: () => "/homestays",
      transformResponse: (response) => response.data || [],
    }),
    getHomestayBySlug: builder.query({
      query: (slug) => `/homestays/${slug}`,
      transformResponse: (response) => response || null, // 👈 return null if no data
    }),
  }),
});

export const { useGetHomestaysQuery, useGetHomestayBySlugQuery } = homestayApi;
