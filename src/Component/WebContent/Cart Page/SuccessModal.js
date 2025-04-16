import React from "react";

const OrderSuccessModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;
  
  const { orderCode, date, total, paymentMethod } = orderDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Success content */}
        <div className="text-center p-6 pt-10">
          <h2 className="text-2xl font-medium mb-4">Thank you! 🎉</h2>
          
          {/* Success icon */}
          <div className="mx-auto mb-6 bg-green-500 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold mb-8">Your order has been received</h3>
          
          {/* Order details */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Order code:</span>
              <span className="font-medium">{orderCode}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{date}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">{total}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Payment method:</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>
          
          {/* Purchase history button */}
          <button 
            onClick={onClose}
            className="bg-gray-500 text-white py-3 px-8 rounded-full hover:bg-gray-600 transition-colors font-medium"
          >
            Purchase history
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;