import { useEffect, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import OrderSuccessModal from "./SuccessModal";

const PurchaseModal = ({ isOpen, onClose, cartItems, total }) => {
  const [activeTab, setActiveTab] = useState("payment");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Generate a random order code
  const generateOrderCode = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `#0${random}`;
  };

  // Get current date in readable format
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Order details for success modal
  const orderDetails = {
    orderCode: generateOrderCode(),
    date: getCurrentDate(),
    total: `$${total.toFixed(2)}`,
    paymentMethod: "Paid through QR",
  };

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("payment");
      setReceiptUploaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setReceiptUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleCompletePurchase = () => {
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose(); // Close the parent modal too
  };

  // Calculate the total quantity of all items
  const totalQuantity = cartItems.reduce(
    (sum, vendor) =>
      sum +
      vendor.items.reduce((vendorSum, item) => {
        // Only count checked items
        return vendorSum + (item.checked ? item.quantity : 0);
      }, 0),
    0
  );

  // Get only the checked items for display
  const checkedItems = cartItems.map(vendor => ({
    ...vendor,
    items: vendor.items.filter(item => item.checked)
  })).filter(vendor => vendor.items.length > 0);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-black shadow-2xl w-full max-w-96 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={handleClose}
            className="absolute top-6 right-2 text-gray-600 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Header */}
          <div className="mb-2 p-4">
            <h2 className="text-lg font-semibold">Complete Your Purchase</h2>
            <p className="text-sm text-gray-500">
              {totalQuantity} item{totalQuantity !== 1 ? "s" : ""} in your order
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border border-gray-300 mx-6">
            <button
              className={`flex-1 py-1 font-medium ${
                activeTab === "payment"
                  ? "text-gray-600 border-r border-gray-300 bg-gray-200"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              Payment
            </button>
            <button
              className={`flex-1 py-1 font-medium ${
                activeTab === "upload"
                  ? "text-gray-600 border-r border-gray-300 bg-gray-200"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("upload")}
              disabled={!receiptUploaded && activeTab === "payment"}
            >
              Upload Receipt
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "payment" ? (
              <>
                <div className="space-y-6 border border-gray-300 rounded-md mb-6">
                  <div className="text-center">
                    <h3 className="flex items-center gap-1 text-yellow-500 font-medium mb-3 text-left bg-gray-200 p-2">
                      <FaQrcode /> Seller's Payment QR Code
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-lg inline-block mb-2">
                      {/* Placeholder for QR code - replace with actual QR component */}
                      <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">QR Code</span>
                      </div>
                    </div>
                    <p className="border-t text-sm text-yellow-500 p-1">
                      Scan this QR code with your payment app to complete the
                      transaction.
                    </p>
                  </div>
                </div>

                {/* Price Details Section */}
                <div className="border border-gray-300 rounded-md mb-6">
                  <h3 className="font-medium mb-3 bg-gray-200 p-2">
                    Price Details
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto p-2">
                    {checkedItems.length > 0 ? (
                      checkedItems.map((vendor, vendorIndex) => (
                        <div key={`vendor-${vendorIndex}`}>
                          <p className="font-medium text-yellow-500 text-sm mb-1">
                            {vendor.vendor}
                          </p>
                          {vendor.items.map((item, itemIndex) => (
                            <div
                              key={`item-${vendorIndex}-${itemIndex}`}
                              className="flex justify-between py-1 px-2"
                            >
                              <div>
                                <span>{item.name}</span>
                                {item.quantity > 1 && (
                                  <span className="text-gray-500 text-xs ml-1">
                                    (×{item.quantity})
                                  </span>
                                )}
                              </div>
                              <span>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        No items selected for checkout
                      </p>
                    )}
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold p-2 bg-gray-50">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("upload")}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mb-3"
                >
                  Confirm Order
                </button>
                <p className="text-sm text-center text-gray-500 p-1">
                  After making the payment, please upload your payment
                  confirmation on the next tab.
                </p>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center border border-gray-300">
                  <h3 className="font-medium mb-3 bg-gray-200 text-left p-4">
                    Upload Your Payment Confirmation
                  </h3>
                  <h3 className="text-sm font-semibold mb-3">
                    Upload Your Payment Confirmation
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Take a screenshot of your payment confirmation and upload it
                    here.
                  </p>

                  <div className="p-4">
                    {receiptUploaded ? (
                      <div className="text-green-600">
                        {uploadedImage && (
                          <div className="mb-4">
                            <img
                              src={uploadedImage}
                              alt="Uploaded receipt"
                              className="max-h-48 mx-auto rounded-md border border-gray-300"
                            />
                          </div>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p>Receipt uploaded successfully!</p>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="receipt-upload"
                          className="hidden"
                          onChange={handleReceiptUpload}
                          accept="image/*"
                        />
                        <label
                          htmlFor="receipt-upload"
                          className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition inline-block text-sm font-medium"
                        >
                          Upload File
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleCompletePurchase}
                    disabled={!receiptUploaded}
                    className={`flex-1 py-2 rounded-lg transition ${
                      receiptUploaded
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-400 text-white cursor-not-allowed"
                    }`}
                  >
                    Complete Purchase
                  </button>
                </div>
                <p className="text-sm text-center text-gray-500 p-1">
                  Thank you for purchasing.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        orderDetails={orderDetails}
      />
    </>
  );
};

export default PurchaseModal;