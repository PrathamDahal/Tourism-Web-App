import { useState } from "react";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "../../../../Services/auth/productApiSlice";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import CreateProductModal from "./CreateProductModal";

const MyProducts = () => {
    const { data: response, isLoading, isError } = useGetProductsQuery();
    const products = response?.products || []; // Access the nested products array
    const [createProduct] = useCreateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
  
    const handleCreateProduct = async (newProduct) => {
      try {
        await createProduct(newProduct).unwrap();
        console.log("Product created successfully");
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    };
  
    const handleUpdate = (productId) => {
      setSelectedProductId(productId);
      setIsUpdateModalOpen(true);
    };
  
    const handleDelete = async (id) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (isConfirmed) {
        try {
          await deleteProduct(id).unwrap();
          console.log("Product deleted successfully");
        } catch (error) {
          console.error("Failed to delete product:", error);
        }
      }
    };
  
    const renderImage = (imageUrl) => {
      if (!imageUrl) {
        return (
          <div className="w-12 h-12 rounded-sm bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        );
      }
  
      if (typeof imageUrl === "string" && imageUrl.startsWith("data:image")) {
        return (
          <img
            src={imageUrl}
            alt="Product"
            className="w-14 h-14 rounded-sm object-contain"
            onError={(e) => {
              e.target.src = "/path/to/fallback-image.jpg";
            }}
          />
        );
      }
  
      if (imageUrl instanceof File || imageUrl instanceof Blob) {
        const objectUrl = URL.createObjectURL(imageUrl);
        return (
          <img
            src={objectUrl}
            alt="Product"
            className="w-14 h-14 rounded-sm object-contain"
            onError={(e) => {
              e.target.src = "/path/to/fallback-image.jpg";
            }}
          />
        );
      }
  
      return (
        <img
          src={imageUrl}
          alt="Product"
          className="w-14 h-14 rounded-sm object-contain"
          onError={(e) => {
            e.target.src = "/path/to/fallback-image.jpg";
          }}
        />
      );
    };
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching products</div>;
  
    return (
      <div className="p-4 min-h-screen">
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
            + Add Product
          </button>
        </div>
  
        <div className="rounded-sm shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Product Image
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Product Name
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Category
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Rate
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Stock
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Orders
                </th>
                <th className="px-4 md:px-6 py-2 text-center text-xs font-medium tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 text-center">
                  <td className="px-4 md:px-6 py-3">
                    {renderImage(product.images[0])} {/* Use the first image if available */}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-800">
                    {product.category}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-800">
                    {product.price} {/* Use price instead of rate */}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-800">
                    {product.stock || "N/A"} {/* Handle missing stock */}
                  </td>
                  <td className="px-4 md:px-6 py-3 text-gray-800">
                    {product.orders || "N/A"} {/* Handle missing orders */}
                  </td>
                  <td className="px-4 md:px-6 py-3">
                    <div className="flex space-x-2 justify-center">
                      <div
                        className="text-green-500 hover:text-green-600 cursor-pointer"
                        onClick={() => handleUpdate(product._id)}
                        title="Edit"
                      >
                        <FaPencilAlt className="w-4 h-4" />
                      </div>
                      <div
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={() => handleDelete(product._id)}
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
  
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProduct}
        />
  
        {/* <UpdateProductModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedProductId(null);
          }}
          productId={selectedProductId}
        /> */}
      </div>
    );
  };
  
  export default MyProducts;