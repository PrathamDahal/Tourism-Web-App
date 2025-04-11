import React from "react";
import ShoppingCart from "../../Component/WebContent/Cart Page/ShoppingCart";
import CartSummary from "../../Component/WebContent/Cart Page/CartSummary";

const AddToCart = () => {
  return (
    <div className="mx-auto px-32 py-8">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-2/3">
          <ShoppingCart />
        </div>
        <div className="lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
