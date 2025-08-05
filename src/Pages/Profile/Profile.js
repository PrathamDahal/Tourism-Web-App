import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaCalendarAlt,
  FaUserTag,
} from "react-icons/fa";
import { useFetchUserProfileQuery } from "../../Services/userApiSlice";

const Profile = () => {
  const { data, isLoading, isError } = useFetchUserProfileQuery();

  if (isLoading)
    return <div className="text-center py-8">Loading profile...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading profile</div>
    );

  const fullName = `${data.firstName}${
    data.middleName ? ` ${data.middleName}` : ""
  } ${data.lastName}`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaUser className="mr-2" /> Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{fullName}</p>
            </div>
            {/* <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{data.username}</p>
            </div> */}
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium capitalize flex items-center">
                <FaUserTag className="mr-2" /> {data.role}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaIdBadge className="mr-2" /> Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium flex items-center">
                <FaEnvelope className="mr-2" /> {data.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium flex items-center">
                <FaPhone className="mr-2" /> {data.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        {data.createdAt && (
        <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" /> Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="font-medium">
                {new Date(data.createdAt).toLocaleDateString()} at{" "}
                {new Date(data.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium">
                {new Date(data.updatedAt).toLocaleDateString()} at{" "}
                {new Date(data.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Profile Image Placeholder - You can implement actual image upload later */}
      {!data.images && (
        <div className="mt-6 text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
            <FaUser className="text-5xl" />
          </div>
          <p className="mt-2 text-gray-500">No profile image uploaded</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
