import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../Features/baseQuery";

export const travelPackageApi = createApi({
  reducerPath: "travelPackageApi",
  baseQuery,
  tagTypes: ["TravelPackage"],
  endpoints: (builder) => ({
    // Get all travel packages
    getTravelPackages: builder.query({
      query: () => "/travel-packages",
      providesTags: ["TravelPackage"],
    }),

    // Get travel package by ID
    getTravelPackageById: builder.query({
      query: (id) => `/travel-packages/${id}`,
      providesTags: (result, error, id) => [{ type: "TravelPackage", id }],
    }),

    // Get travel package by slug
    getTravelPackageBySlug: builder.query({
      query: (slug) => `/travel-packages/${slug}`,
      providesTags: (result, error, slug) => [{ type: "TravelPackage", slug }],
    }),

    // Get travel packages by destinationId (relation)
    getTravelPackagesByDestinationId: builder.query({
      query: (destinationId) =>
        `/travel-packages?destinationId=${destinationId}`,
      providesTags: (result, error, destinationId) => [
        { type: "TravelPackage", destinationId },
      ],
    }),

    // Create a new travel package
    createTravelPackage: builder.mutation({
      query: (formData) => ({
        url: "/travel-packages",
        method: "POST",
        body: formData, // can be FormData (for images) or JSON
      }),
      invalidatesTags: ["TravelPackage"],
    }),

    // Update a travel package
    updateTravelPackage: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/travel-packages/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "TravelPackage", id },
      ],
    }),

    // Delete a travel package
    deleteTravelPackage: builder.mutation({
      query: (id) => ({
        url: `/travel-packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "TravelPackage", id },
      ],
    }),
  }),
});

export const {
  useGetTravelPackagesQuery,
  useGetTravelPackageByIdQuery,
  useGetTravelPackageBySlugQuery,
  useGetTravelPackagesByDestinationIdQuery,
  useCreateTravelPackageMutation,
  useUpdateTravelPackageMutation,
  useDeleteTravelPackageMutation,
} = travelPackageApi;
