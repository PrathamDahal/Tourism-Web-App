import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../Features/baseQuery';

export const siteSettingsApi = createApi({
  reducerPath: 'siteSettingsApi',
  baseQuery,
  tagTypes: ['SiteSettings'], // Add tag types for cache invalidation
  endpoints: (builder) => ({
    // Existing query to fetch site settings
    getSiteSettings: builder.query({
      query: () => '/site-settings',
      providesTags: ['SiteSettings'], // Provide tags for cache management
    }),

    // New mutation to create site settings
    createSiteSetting: builder.mutation({
      query: (siteSettings) => ({
        url: '/site-settings',
        method: 'POST',
        body: siteSettings,
      }),
      invalidatesTags: ['SiteSettings'], // Invalidate cache after creation
    }),

    // Existing mutation to update site settings
    updateSiteSetting: builder.mutation({
      query: (siteSettings) => ({
        url: '/site-settings', 
        method: 'PATCH', 
        body: siteSettings, 
      }),
      invalidatesTags: ['SiteSettings'], // Invalidate cache after update
    }),
  }),
});

// Export the hooks for the query and both mutations
export const { 
  useGetSiteSettingsQuery, 
  useCreateSiteSettingMutation,
  useUpdateSiteSettingMutation 
} = siteSettingsApi;