import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const siteSettingsApi = createApi({
  reducerPath: 'siteSettingsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tourism.smartptrm.com/api/v1/' }), 
  endpoints: (builder) => ({
    getSiteSettings: builder.query({
      query: () => 'site-settings', 
    }),
  }),
});

export const { useGetSiteSettingsQuery } = siteSettingsApi;