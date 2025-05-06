import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../Features/baseQuery';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // Get cart items
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    
    // Add to cart
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: '/cart',
        method: 'POST',
        body: cartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Update cart item
    updateCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Remove from cart
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;