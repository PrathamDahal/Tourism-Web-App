import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../Services/resetPasswordApi";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await resetPassword({ token, password: newPassword }).unwrap();
      navigate("/login");
    } catch (error) {
      setError(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="bg-white lg:rounded-2xl p-8 w-full lg:max-w-md">
      <div className="font-Playfair font-light text-center p-2 mb-4">
        <h1 className="text-4xl">Reset Password</h1>
        <p>Please enter new password.</p>
      </div>
      <form onSubmit={handleResetPassword}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 block w-full px-4 py-3 border ${
              confirmPassword && newPassword !== confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            } rounded-lg shadow-sm focus:outline-none transition-all duration-300`}
            required
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}
        </div>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}
        {isSuccess && (
          <p className="text-center text-green-600 mb-4">
            Password reset successfully!
          </p>
        )}

        <button
          type="submit"
          className="text-xl w-full bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-transform duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
