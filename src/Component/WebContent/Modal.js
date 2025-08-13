import React from "react";
import { FiInfo } from "react-icons/fi"; // Info icon (optional)

const Modal = ({ message, isVisible, onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
      <div className="bg-white px-6 py-4 rounded-lg shadow-xl w-full max-w-md mx-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="text-blue-500 text-xl">
            <FiInfo />
          </div>
          <p className="text-gray-800 text-sm md:text-base font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
