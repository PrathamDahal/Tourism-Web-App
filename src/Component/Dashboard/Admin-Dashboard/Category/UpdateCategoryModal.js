import React from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../../Services/auth/categoryApiSlice";

const UpdateCategoryModal = ({ isOpen, onClose, categoryId }) => {
  // Fetch category data by ID
  const { data: category } =
    useGetCategoryByIdQuery(categoryId, {
      skip: !categoryId, // Skip fetching if no categoryId is provided
    });

  // Update mutation
  const [updateCategory] = useUpdateCategoryMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      imageUrl: category?.imageUrl || null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      imageUrl: Yup.mixed().nullable(), // Image is optional for update
    }),
    enableReinitialize: true, // Automatically reinitialize form when initialValues change
    onSubmit: async (values) => {
      try {
        // Prepare the data to update
        const updatedData = {
          id: categoryId, // Pass the category ID
          ...values, // Include updated fields
        };

        // Call the update mutation
        await updateCategory(updatedData).unwrap();

        // Close the modal after successful update
        onClose();
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
  });

  if (!isOpen || !categoryId) return null;

  return (
    <div className="fixed inset-16 bg-gray-100 bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2 relative shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-Open items-center">Update Category</h2>
          <button onClick={onClose} className="hover:text-gray-500">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 justify-center">
            <h3 className="font-Open text-red-600 mb-6">Basic Information</h3>
            <div className="mb-4 flex flex-col items-center justify-center">
              <img
                src={category?.imageUrl || "/assets/Images/Upload-Image.png"}
                alt="Upload-Image"
                className="w-32 h-24 rounded-sm object-cover mb-3"
              />
              <input
                type="file"
                onChange={(e) =>
                  formik.setFieldValue("imageUrl", e.target.files[0])
                }
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Update Category Image
              </label>
              {formik.values.imageUrl && (
                <span className="ml-4 text-sm text-gray-600">
                  {formik.values.imageUrl.name}
                </span>
              )}
              {formik.touched.imageUrl && formik.errors.imageUrl ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.imageUrl}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Category Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Brief overview"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="1"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-14 py-2 font-Open bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;