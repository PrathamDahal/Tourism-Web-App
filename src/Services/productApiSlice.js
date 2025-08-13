import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../Features/baseQuery";

// Create the API slice
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  tagTypes: ["Product"], // Optional: for caching and invalidation
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"], // Optional: for caching
    }),

    // Get products by user ID
    getProductsByUserId: builder.query({
      query: (userId) => `/products/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "Product", userId }],
    }),

    // Get products by category ID
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products?category=${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: "Product", categoryId },
      ],
    }),

    // Get products by category slug
    getProductsByCategorySlug: builder.query({
      query: (slug) => `/products?category=${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", slug }],
    }),

    // Get a single product by slug
    getProductBySlug: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", slug }],
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
        formData: true, // This tells RTK Query to handle as FormData
      }),
      invalidatesTags: ["Product"],
    }),

    // Update an existing product
    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }], // Optional: for cache invalidation
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductsByUserIdQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCategorySlugQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
