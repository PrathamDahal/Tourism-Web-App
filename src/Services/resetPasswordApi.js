import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Features/baseQuery';

export const resetPasswordApi = createApi({
  reducerPath: 'resetPasswordApi',
  baseQuery,
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApi;
