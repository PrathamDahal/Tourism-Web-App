import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useUpdateSiteSettingMutation,
  useGetSiteSettingsQuery,
} from "../../../../Services/auth/SiteSettingApi.js";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const SettingsContent = () => {
  // Fetch site settings data
  const {
    data: siteSettings,
    isLoading: isFetching,
    isError,
  } = useGetSiteSettingsQuery();

  // Mutation for updating site settings
  const [updateSiteSetting, { isLoading: isUpdating }] =
    useUpdateSiteSettingMutation();

  // Ref to track initial data load
  const isInitialLoad = useRef(true);

  const [logoPreview, setLogoPreview] = useState("");

  // Initialize Formik
  const formik = useFormik({
    // Set initial values to empty or default values
    initialValues: {
      logoUrl: "",
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
      district: "",
      facebookLink: "",
      twitterLink: "",
      instagramLink: "",
      linkedIn: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      district: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateSiteSetting(values).unwrap(); // Call the mutation
        alert("Site settings updated successfully!");
      } catch (error) {
        alert("Failed to update site settings.");
      }
    },
  });

  // Update Formik's initial values when data is fetched
  useEffect(() => {
    if (siteSettings && isInitialLoad.current) {
      formik.setValues({
        logoUrl: siteSettings.logoUrl || "",
        name: siteSettings.name || "",
        phoneNumber: siteSettings.phoneNumber || "",
        address: siteSettings.address || "",
        email: siteSettings.email || "",
        district: siteSettings.district || "",
        facebookLink: siteSettings.facebookLink || "",
        twitterLink: siteSettings.twitterLink || "",
        instagramLink: siteSettings.instagramLink || "",
        linkedIn: siteSettings.linkedIn || "",
      });
      isInitialLoad.current = false; // Mark initial load as complete
    }
  }, [siteSettings, formik]); // Run this effect when `siteSettings` changes

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result); // Set logo preview
        formik.setFieldValue("logoUrl", reader.result); // Update Formik's logoUrl field
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handle loading and error states
  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching site settings.</div>;
  }

  return (
    <div className="p-4 h-auto bg-white shadow-md rounded-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Left Side - Titles */}
      <div className="w-64 relative space-y-20 justify-between hidden md:block">
        <div className="absolute top-2 p-2">
          <h2 className="font-semibold mb-2">Company Info</h2>
          <p className="text-sm text-gray-500">
            You can change your Company informations settings here.
          </p>
        </div>
        <div className="absolute top-80 p-2">
          <h2 className="font-semibold mb-2">Socials Info</h2>
          <p className="text-sm text-gray-500">
            You can change your Social informations settings here.
          </p>
        </div>
      </div>

      <div className="w-full rounded-xl p-4 border border-gray-300">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="mb-4">
            {logoPreview ? (
              <div className="flex items-center space-x-4">
                <img
                  src={`${API_BASE_URL}/${logoPreview}`}
                  alt="Logo Preview"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("logoInput").click()} // Trigger file input
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  Change Logo
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <img
                  src="/assets/Images/default-avatar-image.jpg"
                  alt="Default Logo"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("logoInput").click()} // Trigger file input
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  Change Logo
                </button>
              </div>
            )}
            <input
              id="logoInput"
              name="logoUrl"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <input
                id="district"
                name="district"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.district}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="facebookLink"
                className="block text-sm font-medium text-gray-700"
              >
                Facebook Link
              </label>
              <input
                id="facebookLink"
                name="facebookLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.facebookLink}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="twitterLink"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter Link
              </label>
              <input
                id="twitterLink"
                name="twitterLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.twitterLink}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="instagramLink"
                className="block text-sm font-medium text-gray-700"
              >
                Instagram Link
              </label>
              <input
                id="instagramLink"
                name="instagramLink"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.instagramLink}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="linkedIn"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn
              </label>
              <input
                id="linkedIn"
                name="linkedIn"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.linkedIn}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full md:w-auto float-right inline-flex justify-center ml-auto py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsContent;
