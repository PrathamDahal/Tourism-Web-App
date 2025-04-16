import { useEffect, useState } from "react";
import OrderSuccessModal from "./SuccessModal";

const CODPurchaseModal = ({ isOpen, onClose, cartItems, total }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Generate a random order code
  const generateOrderCode = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `#0${random}`;
  };
  
  // Get current date in readable format
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Order details for success modal
  const orderDetails = {
    orderCode: generateOrderCode(),
    date: getCurrentDate(),
    total: `Rs. ${total.toFixed(2)}`,
    paymentMethod: "Cash on Delivery"
  };

  useEffect(() => {
    if (!isOpen) {
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    (sum, vendor) => sum + vendor.items.reduce((vendorSum, item) => vendorSum + item.quantity, 0),
    0
  );

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
          <div className="p-4">
            <h2 className="mb-1 text-lg font-semibold">Complete Your Purchase</h2>
            <p className="text-sm text-gray-500">{totalQuantity} item{totalQuantity !== 1 ? 's' : ''} in your order</p>
          </div>

          {/* COD Content */}
          <div className="px-6 py-1">
            <div className="space-y-6 border border-gray-300 rounded-md mb-6">
              <div className="text-center">
                <h3 className="font-medium mb-3 text-left bg-gray-200 p-2">
                  Cash on Delivery
                </h3>
                <div className="p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600 mb-4">
                    You'll pay in cash when your order is delivered. Please have the exact amount ready.
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    Total to pay on delivery: Rs.{total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Price Details Section */}
            <div className="border border-gray-300 rounded-md mb-6">
              <h3 className="font-medium mb-3 bg-gray-200 p-2">
                Order Summary
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto p-2">
                {cartItems.map((vendor, vendorIndex) => (
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
                        <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold p-2 bg-gray-50">
                <span>Total</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCompletePurchase}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mb-3"
            >
              Confirm Order
            </button>
            <p className="text-sm text-center text-gray-500 p-1">
              Your order will be processed immediately after confirmation.
            </p>
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

export default CODPurchaseModal;