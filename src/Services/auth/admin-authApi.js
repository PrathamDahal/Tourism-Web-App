import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../../Features/baseQuery';

export const protectedApi = createApi({
  reducerPath: 'protectedApi',
  baseQuery,
  endpoints: (builder) => ({
    checkAdminAuth: builder.query({
      query: () => '/auth/admin-auth', // The endpoint for the protected route
    }),
  }),
});

export const { useCheckAdminAuthQuery } = protectedApi;