import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../Features/baseQuery';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  tagTypes: ['Category', 'CategoryProducts'], // Added 'CategoryProducts' for products caching
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query({
      query: () => '/productcategories',
      providesTags: ['Category'], 
    }),

    // GET a specific category by ID
    getCategoryById: builder.query({
      query: (id) => `/productcategories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),

    getCategoryBySlug: builder.query({
      query: (slug) => `/productcategories/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Category', slug }],
    }),

    // GET all products inside a specific category
    getCategoryProducts: builder.query({
      query: (categoryId) => `/productcategories/${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: 'CategoryProducts', id: categoryId },
        ...(result?.products?.map(({ id }) => ({ type: 'CategoryProducts', id })) || []),
      ],
      transformResponse: (response) => {
        // Assuming the API returns the category with a products array
        return response.products || [];
      },
    }),

    // CREATE a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/productcategories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),

    // UPDATE a category
    updateCategory: builder.mutation({
      query: ({ id, ...updatedCategory }) => ({
        url: `/productcategories/${id}`,
        method: 'PATCH',
        body: updatedCategory,
      }),
      invalidatesTags: ['Category'],
    }),

    // DELETE a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/productcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryBySlugQuery,
  useGetCategoryProductsQuery, // Added the new hook
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;