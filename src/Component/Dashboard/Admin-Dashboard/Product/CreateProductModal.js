import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateProductModal = ({ isOpen, onClose, onCreate }) => {
  const [modalKey, setModalKey] = useState(0);
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      tags: "",
      stock: "",
      images: [],
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number().required("Price is required"),
      category: Yup.string().required("Category is required"),
      tags: Yup.string().required("Tags are required"),
      stock: Yup.number().required("Stock amount is required"),
      images: Yup.array().min(1, "At least one image is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      onCreate(values);
      handleClose();
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("images", files);
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
    setModalKey((prevKey) => prevKey + 1);
    setStep(1);
  };

  const handleNextStep = () => {
    if (step === 1) {
      const fieldsToValidate = ["name", "price", "category", "tags", "stock", "images"];
      const isValid = fieldsToValidate.every((field) => !formik.errors[field]);
      if (isValid) {
        setStep(2);
      }
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div key={modalKey} className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2 relative shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">List Products</h2>
          <button onClick={handleClose} className="hover:text-gray-500" aria-label="Close modal">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex mb-6">
          <div className="flex items-center">
            <div className={`rounded-full w-6 h-6 flex items-center justify-center ${step === 1 ? 'bg-red-600 text-white' : 'bg-gray-500 text-white'}`}>
              1
            </div>
            <span className={`ml-2 ${step === 1 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>Basic Information</span>
          </div>
          <div className="mx-4 text-xl text-gray-600">
            &gt;
          </div>
          <div className="flex items-center">
            <div className={`rounded-full w-6 h-6 flex items-center justify-center ${step === 2 ? 'bg-red-600 text-white' : 'bg-gray-500 text-white'}`}>
              2
            </div>
            <span className={`ml-2 ${step === 2 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>Description</span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <h3 className="text-red-600 mb-6">Basic Information</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="w-24 h-24 border border-gray-300 flex items-center justify-center">
                      {formik.values.images[index] ? (
                        <img
                          src={URL.createObjectURL(formik.values.images[index])}
                          alt="Uploaded"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">+</span>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 block text-center"
                >
                  Add Product Images
                </label>
                {formik.touched.images && formik.errors.images && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.images}</div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    {...formik.getFieldProps("name")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Rate of product"
                    {...formik.getFieldProps("price")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    {...formik.getFieldProps("category")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Type tags and click enter"
                    {...formik.getFieldProps("tags")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formik.touched.tags && formik.errors.tags && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.tags}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Amount of Products"
                    {...formik.getFieldProps("stock")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.stock}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-14 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4">
                <h3 className="text-red-600 mb-6">Description</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description (up to 10 lines)"
                    {...formik.getFieldProps("description")}
                    rows={10}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-14 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-14 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;