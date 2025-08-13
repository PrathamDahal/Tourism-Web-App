import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetCategoryBySlugQuery, useUpdateCategoryMutation } from "../../../../Services/categoryApiSlice";


const UpdateCategoryModal = ({
  isOpen,
  onClose,
  slug,              // changed prop name here
  onUpdateSuccess,
}) => {
  // Fetch category data by slug
  const { data: category } = useGetCategoryBySlugQuery(slug, {
    skip: !slug, // Skip fetching if no slug is provided
  });

  // Update mutation
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Prepare the data to update
        const updatedData = {
          slug,           // send slug instead of id
          ...values,
        };

        // Call the update mutation
        await updateCategory(updatedData).unwrap();

        // Notify parent component of success
        if (onUpdateSuccess) {
          onUpdateSuccess("Category updated successfully!");
        }

        // Close modal
        onClose();
      } catch (error) {
        console.error("Failed to update category:", error);
        if (onUpdateSuccess) {
          onUpdateSuccess(error.message || "Failed to update category", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen || !slug) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-Open items-center">Update Category</h2>
          <button onClick={onClose} className="hover:text-gray-500" disabled={isUpdating}>
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 justify-center">
            <h3 className="font-Open text-red-600 mb-6">Basic Information</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Category Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-lg"
                disabled={isUpdating}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Brief overview"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                disabled={isUpdating}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-14 py-2 font-Open bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              disabled={isUpdating || !formik.isValid || formik.isSubmitting}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
