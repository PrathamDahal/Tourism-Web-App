import React from "react";

const CartSummary = () => {
  return (
    <div className="h-fit w-full p-6 border-gray-500 border rounded-lg shadow-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Cart summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="payment"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="cod" className="ml-2">Cash on delivery</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="radio"
            id="payNow"
            name="payment"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="payNow" className="ml-2">Pay Now Through Qr</label>
        </div>
      </div>

      <div className="border-t border-b py-4 my-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold">$1345.00</span>
        </div>
      </div>

      <button className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;