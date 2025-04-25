import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, items = [] }) => {
  if (!isOpen) return null;
  
  // Use the provided items or default to empty array
  const itemsToDisplay = items || [];
  const itemCount = itemsToDisplay.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-5 rounded-lg max-w-md w-[90%]">
        <h3 className="border-b font-medium font-poppins text-lg mb-3 pb-2">
          Confirm Deletion
        </h3>
        <p className="font-poppins font-medium mb-3">
          Are you sure you want to delete {itemCount} item{itemCount !== 1 ? 's' : ''}?
          {/* Safer message that handles 0, 1, or multiple items */}
        </p>
        
        {/* Only show the list if there are items */}
        {itemCount > 0 && (
          <ul className="my-3 pl-5 max-h-40 overflow-y-auto">
            {itemsToDisplay.map((item, index) => (
              <li key={index} className="list-disc py-1">
                {item.name || 'Unnamed Item'}
                {/* Fallback for item name */}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;