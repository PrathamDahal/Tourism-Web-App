import React, { useState } from "react";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../Services/auth/categoryApiSlice";
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";

const CategoryType = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCreateCategory = async (newCategory) => {
    try {
      await createCategory(newCategory).unwrap();
      console.log("Category created successfully");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdate = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      try {
        await deleteCategory(id).unwrap();
        console.log("Category deleted successfully");
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  // Function to handle image rendering
  const renderImage = (imageUrl) => {
    if (!imageUrl) {
      return (
        <div className="w-12 h-12 rounded-sm bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      );
    }

    // Check if the imageUrl is a base64 string
    if (typeof imageUrl === "string" && imageUrl.startsWith("data:image")) {
      return (
        <img
          src={imageUrl}
          alt="Category"
          className="w-14 h-14 rounded-sm object-contain"
          onError={(e) => {
            e.target.src = "/path/to/fallback-image.jpg"; // Fallback image
          }}
        />
      );
    }

    // Check if the imageUrl is a file object
    if (imageUrl instanceof File || imageUrl instanceof Blob) {
      const objectUrl = URL.createObjectURL(imageUrl);
      return (
        <img
          src={objectUrl}
          alt="Category"
          className="w-14 h-14 rounded-sm object-contain"
          onError={(e) => {
            e.target.src = "/path/to/fallback-image.jpg"; // Fallback image
          }}
        />
      );
    }

    // Assume it's a URL
    return (
      <img
        src={imageUrl}
        alt="Category"
        className="w-14 h-14 rounded-sm object-contain"
        onError={(e) => {
          e.target.src = "/path/to/fallback-image.jpg"; // Fallback image
        }}
      />
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories</div>;

  return (
    <div className="p-4 min-h-screen">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center py-2 mb-3 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative flex w-full md:w-64">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BiSearch
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <button className="px-3 py-2 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 w-full md:w-auto">
            Filter <BiFilterAlt size={18} className="ml-2" />
          </button>
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full md:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="rounded-sm shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                Image
              </th>
              <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                Name
              </th>
              <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                Description
              </th>
              <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                Total Products
              </th>
              <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories?.map((category) => (
              <tr key={category._id} className="hover:bg-gray-100 text-center">
                <td className="px-4 md:px-6 py-3">
                  {renderImage(category.imageUrl)}
                </td>
                <td className="px-4 md:px-6 py-3 text-gray-800">
                  {category.name}
                </td>
                <td
                  className="px-4 md:px-6 py-3 text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ maxWidth: "200px" }}
                  title={category.description} // Optional: Show full description on hover
                >
                  {category.description}
                </td>
                <td className="px-4 md:px-6 py-3 text-gray-800">
                  {category.totalProducts}
                </td>
                <td className="px-4 md:px-6 py-3">
                  <div className="flex space-x-2 justify-center">
                    <div
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                      onClick={() => handleUpdate(category._id)}
                      title="Edit"
                    >
                      <FaPencilAlt className="w-4 h-4" />
                    </div>
                    <div
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDelete(category._id)}
                      title="Delete"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <CreateCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCategory}
      />

      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCategoryId(null);
        }}
        categoryId={selectedCategoryId}
      />
    </div>
  );
};

export default CategoryType;
