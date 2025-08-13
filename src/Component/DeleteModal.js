const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  items = [],
  action = "delete",
  title,
  message
}) => {
  if (!isOpen) return null;

  const itemsToDisplay = items || [];
  const itemCount = itemsToDisplay.length;

  // Default titles/messages based on action if not provided
  const modalTitle =
    title || (action === "clear" ? "Clear Entire Cart" : "Confirm Deletion");
  const modalMessage =
    message ||
    (action === "clear"
      ? "Are you sure you want to remove all items from your cart?"
      : `Are you sure you want to delete ${itemCount} item${
          itemCount !== 1 ? "s" : ""
        }?`);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-5 rounded-lg max-w-md w-[90%]">
        <h3 className="border-b font-medium font-poppins text-lg mb-3 pb-2">
          {modalTitle}
        </h3>
        <p className="font-poppins font-medium mb-3">{modalMessage}</p>

        {/* Show item list only for delete action and if there are items */}
        {action === "delete" && itemCount > 0 && (
          <ul className="my-3 pl-5 max-h-40 overflow-y-auto">
            {itemsToDisplay.map((item, index) => (
              <li key={index} className="list-disc py-1">
                {item.name || "Unnamed Item"}
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
            className={`px-4 py-2 ${
              action === "clear"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white rounded-md transition-colors`}
          >
            {action === "clear" ? "Clear" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
