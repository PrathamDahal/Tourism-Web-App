import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useCreateTravelPackageMutation } from "../../../../Services/travelPackageApiSlice";

const CreateTravelPackageModal = ({ isOpen, onClose }) => {
  const editorRef = useRef(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [createTravelPackage, { isLoading }] = useCreateTravelPackageMutation();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Enter package description...",
      height: 250,
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "|",
        "undo",
        "redo",
      ],
      removeButtons: ["image", "video", "file"],
    }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      durationDays: "",
      durationNights: "",
      coverImage: null,
      images: [],
      included: [""],
      notIncluded: [""],
      destinations: [""],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required").positive(),
      durationDays: Yup.number().required("Days required").min(1),
      durationNights: Yup.number().required("Nights required").min(0),
      destinations: Yup.array()
        .of(Yup.string().required("Destination cannot be empty"))
        .min(1, "At least one destination is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "coverImage" && values.coverImage) {
            formData.append("coverImage", values.coverImage);
          } else if (key === "images") {
            values.images.forEach(
              (file) => file && formData.append("images", file)
            );
          } else if (Array.isArray(values[key])) {
            // Filter out empty strings before appending
            const filteredArray = values[key].filter(
              (item) => item && item.trim() !== ""
            );
            filteredArray.forEach((item) => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, values[key]);
          }
        });

        await createTravelPackage(formData).unwrap();
        resetForm();
        setCoverPreview(null);
        setImagePreviews([]);
        onClose();
      } catch (err) {
        console.error("Failed to create travel package:", err);
      }
    },
  });

  // Memoize the reset function to avoid dependency issues
  const resetFormAndPreviews = useCallback(() => {
    formik.resetForm();
    setCoverPreview(null);
    setImagePreviews([]);
  }, [formik]);

  // Reset form & previews whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      resetFormAndPreviews();
    }
  }, [isOpen, resetFormAndPreviews]);

  // Handle cover image change
  const handleCoverImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        formik.setFieldValue("coverImage", file);

        // Clean up previous preview URL to prevent memory leaks
        if (coverPreview) {
          URL.revokeObjectURL(coverPreview);
        }

        setCoverPreview(URL.createObjectURL(file));
      }
    },
    [formik, coverPreview]
  );

  // Handle removing cover image
  const handleRemoveCoverImage = useCallback(() => {
    formik.setFieldValue("coverImage", null);
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }
    setCoverPreview(null);
  }, [formik, coverPreview]);

  // Handle gallery images change
  const handleGalleryImagesChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files).slice(0, 5);
      formik.setFieldValue("images", files);

      // Clean up previous preview URLs
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });

      // Create new preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    },
    [formik, imagePreviews]
  );

  // Handle removing individual gallery image
  const handleRemoveGalleryImage = useCallback(
    (idx) => {
      const newImages = [...formik.values.images];
      const newPreviews = [...imagePreviews];

      // Clean up the specific preview URL
      if (newPreviews[idx]) {
        URL.revokeObjectURL(newPreviews[idx]);
      }

      newImages[idx] = null;
      newPreviews[idx] = null;

      formik.setFieldValue("images", newImages);
      setImagePreviews(newPreviews);
    },
    [formik, imagePreviews]
  );

  // Clean up URLs on unmount
  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [formik, coverPreview, imagePreviews]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white py-6 px-8 rounded-2xl w-full md:w-3/5 relative shadow-black shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-red-600 font-semibold">
            Create Travel Package
          </h2>
          <button
            onClick={onClose}
            className="hover:text-gray-500"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              {/* Preview Box */}
              <div className="w-32 h-32 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-100 relative">
                {coverPreview ? (
                  <>
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Remove button */}
                    <button
                      type="button"
                      className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                      onClick={handleRemoveCoverImage}
                    >
                      <FaTimes size={12} />
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400">+</span>
                )}
              </div>

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="cover-upload"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Upload Cover
                </label>
              </div>
            </div>

            {formik.touched.coverImage && formik.errors.coverImage && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.coverImage}
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-24 h-24 border border-gray-300 rounded-md flex items-center justify-center relative overflow-hidden bg-gray-100"
                >
                  {formik.values.images[idx] ? (
                    <>
                      <img
                        src={URL.createObjectURL(formik.values.images[idx])}
                        alt="Gallery preview"
                        className="w-full h-full object-cover"
                      />
                      {/* Remove image button */}
                      <button
                        type="button"
                        className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                        onClick={() => handleRemoveGalleryImage(idx)}
                      >
                        <FaTimes size={12} />
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 cursor-pointer">+</span>
                  )}
                </div>
              ))}
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleGalleryImagesChange}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 block text-center"
            >
              Add Images
            </label>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="w-full p-2 border rounded-lg"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                {...formik.getFieldProps("price")}
                className="w-full p-2 border rounded-lg"
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-sm">
                  {formik.errors.price}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration Days *
              </label>
              <input
                type="number"
                {...formik.getFieldProps("durationDays")}
                className="w-full p-2 border rounded-lg"
              />
              {formik.touched.durationDays && formik.errors.durationDays && (
                <div className="text-red-500 text-sm">
                  {formik.errors.durationDays}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration Nights *
              </label>
              <input
                type="number"
                {...formik.getFieldProps("durationNights")}
                className="w-full p-2 border rounded-lg"
              />
              {formik.touched.durationNights &&
                formik.errors.durationNights && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.durationNights}
                  </div>
                )}
            </div>
          </div>

          {/* Included / Not Included */}
          <div className="grid grid-rows-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's Included
              </label>
              {formik.values.included.map((item, idx) => (
                <div key={idx} className="flex gap-2 mt-1 items-center">
                  <input
                    type="text"
                    placeholder="Accommodation, Breakfast, etc"
                    value={item}
                    onChange={(e) => {
                      const arr = [...formik.values.included];
                      arr[idx] = e.target.value;
                      formik.setFieldValue("included", arr);
                    }}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  {formik.values.included.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const arr = [...formik.values.included];
                        arr.splice(idx, 1);
                        formik.setFieldValue(
                          "included",
                          arr.length ? arr : [""]
                        );
                      }}
                      className="text-red-500 px-2"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("included", [
                    ...formik.values.included,
                    "",
                  ])
                }
                className="mt-1 px-3 py-1 bg-gray-200 text-sm rounded-lg hover:bg-gray-300"
              >
                + Add
              </button>
            </div>

            {/* Not Included Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's Not Included
              </label>
              {formik.values.notIncluded.map((item, idx) => (
                <div key={idx} className="flex gap-2 mt-1 items-center">
                  <input
                    type="text"
                    placeholder="Insurance, etc"
                    value={item}
                    onChange={(e) => {
                      const arr = [...formik.values.notIncluded];
                      arr[idx] = e.target.value;
                      formik.setFieldValue("notIncluded", arr);
                    }}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  {formik.values.notIncluded.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const arr = [...formik.values.notIncluded];
                        arr.splice(idx, 1);
                        formik.setFieldValue(
                          "notIncluded",
                          arr.length ? arr : [""]
                        );
                      }}
                      className="text-red-500 px-2"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("notIncluded", [
                    ...formik.values.notIncluded,
                    "",
                  ])
                }
                className="mt-1 px-3 py-1 bg-gray-200 text-sm rounded-lg hover:bg-gray-300"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <JoditEditor
              ref={editorRef}
              value={formik.values.description}
              onChange={(val) => formik.setFieldValue("description", val)}
              config={config}
              onBlur={() => formik.setFieldTouched("description", true)}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Destinations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinations (IDs or Slugs) *
            </label>

            {formik.values.destinations.map((destination, idx) => (
              <div key={idx} className="flex gap-2 mt-1 items-center">
                <input
                  type="text"
                  placeholder="pokhara or 93406fc8-0530-4c01-8bb6-c1c05c9c19ba"
                  value={destination}
                  onChange={(e) => {
                    const arr = [...formik.values.destinations];
                    arr[idx] = e.target.value;
                    formik.setFieldValue("destinations", arr);
                  }}
                  className="flex-1 p-2 border rounded-lg"
                />
                {formik.values.destinations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const arr = [...formik.values.destinations];
                      arr.splice(idx, 1);
                      formik.setFieldValue(
                        "destinations",
                        arr.length ? arr : [""]
                      );
                    }}
                    className="text-red-500 px-2"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("destinations", [
                  ...formik.values.destinations,
                  "",
                ])
              }
              className="mt-1 px-3 py-1 bg-gray-200 text-sm rounded-lg hover:bg-gray-300"
            >
              + Add
            </button>

            {formik.touched.destinations && formik.errors.destinations && (
              <div className="text-red-500 text-sm">
                {formik.errors.destinations}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading ? "Creating..." : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTravelPackageModal;
