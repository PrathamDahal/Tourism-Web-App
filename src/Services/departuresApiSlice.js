// services/departuresApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../Features/baseQuery';

export const departuresApi = createApi({
  reducerPath: 'departuresApi',
  baseQuery,
  endpoints: (builder) => ({
    // GET all departures for a package
    getDepartures: builder.query({
      query: (slug) => `travel-packages/${slug}/departures`,
    }),

    // CREATE a new departure for a package
    createDeparture: builder.mutation({
      query: ({ slug, data }) => ({
        url: `travel-packages/${slug}/departures`,
        method: 'POST',
        body: data,
      }),
    }),

    // UPDATE an existing departure
    updateDeparture: builder.mutation({
      query: ({ slug,id, data }) => ({
        url: `travel-packages/${slug}/departures/${id}`, // or use slug dynamically
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDeparturesQuery,
  useCreateDepartureMutation,
  useUpdateDepartureMutation, // ✅ added update mutation
} = departuresApi;
