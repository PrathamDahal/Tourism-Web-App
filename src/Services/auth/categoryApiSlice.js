import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './../../Features/baseQuery';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  tagTypes: ['Category'], // Used for caching and invalidation
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query({
      query: () => '/seller-categories',
      providesTags: ['Category'], 
    }),

    // GET a specific category by ID
    getCategoryById: builder.query({
      query: (id) => `/seller-categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }], // Cache by ID
    }),

    // CREATE a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/seller-categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'], // Invalidate cache after creation
    }),

    // UPDATE a category
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `/seller-categories/${id}`,
        method: 'PATCH',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'], // Invalidate cache after update
    }),

    // DELETE a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/seller-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'], // Invalidate cache after deletion
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery, // Export the new hook
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;