import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../../Features/baseQuery';

export const siteSettingsApi = createApi({
  reducerPath: 'siteSettingsApi',
  baseQuery,
  endpoints: (builder) => ({
    // Existing query to fetch site settings
    getSiteSettings: builder.query({
      query: () => 'site-settings',
    }),

    // New mutation to update site settings
    updateSiteSetting: builder.mutation({
      query: (siteSettings) => ({
        url: 'site-settings', 
        method: 'PATCH', 
        body: siteSettings, 
      }),
    }),
  }),
});

// Export the hooks for both the query and the mutation
export const { useGetSiteSettingsQuery, useUpdateSiteSettingMutation } = siteSettingsApi;