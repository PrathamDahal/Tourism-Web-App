import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import DeleteConfirmationModal from "../../DeleteModal";
import PurchaseModal from "./QrPurchaseModal";
import CODPurchaseModal from "./CODPurchaseModal";

const ShoppingCartPage = () => {
  const initialProducts = [
    {
      vendor: "Bajrang Fashion Collection",
      items: [
        {
          id: 1,
          name: "Tray Table",
          color: "Black",
          quantity: 1,
          initialStock: 5, // Maximum available stock
          price: 19.0,
          checked: false,
        },
        {
          id: 2,
          name: "Wooden Chair",
          color: "Brown",
          quantity: 1,
          initialStock: 3,
          price: 45.0,
          checked: false,
        },
      ],
      checked: false,
    },
    {
      vendor: "Abc Chair House",
      items: [
        {
          id: 3,
          name: "Coffee Table",
          color: "White",
          quantity: 1,
          initialStock: 2,
          price: 25.0,
          checked: false,
        },
        {
          id: 4,
          name: "Side Table",
          color: "Black",
          quantity: 1,
          initialStock: 4,
          price: 32.0,
          checked: false,
        },
      ],
      checked: false,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [hasCheckedItems, setHasCheckedItems] = useState(false);
  const [total, setTotal] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Calculate total whenever products change
  useEffect(() => {
    const calculatedTotal = products.reduce((sum, vendor) => {
      return (
        sum +
        vendor.items.reduce((vendorSum, item) => {
          return vendorSum + item.quantity * item.price;
        }, 0)
      );
    }, 0);

    setTotal(calculatedTotal);

    const checked = products.some(
      (vendor) => vendor.checked || vendor.items.some((item) => item.checked)
    );
    setHasCheckedItems(checked);
  }, [products]);

  // Calculate subtotal for an item
  const calculateSubtotal = (item) => {
    return (item.quantity * item.price).toFixed(2);
  };

  // Update quantity of an item
  const updateQuantity = (vendorIndex, itemIndex, newQuantity) => {
    const item = products[vendorIndex].items[itemIndex];

    // Don't allow quantity less than 1 or more than initial stock
    if (newQuantity < 1 || newQuantity > item.initialStock) return;

    const updatedProducts = [...products];
    updatedProducts[vendorIndex].items[itemIndex].quantity = newQuantity;
    setProducts(updatedProducts);
  };

  // Toggle item checkbox
  const toggleItemCheck = (vendorIndex, itemIndex) => {
    const updatedProducts = [...products];
    const item = updatedProducts[vendorIndex].items[itemIndex];
    item.checked = !item.checked;

    // Update vendor checkbox if all items are checked/unchecked
    const vendor = updatedProducts[vendorIndex];
    vendor.checked = vendor.items.every((item) => item.checked);

    setProducts(updatedProducts);
  };

  // Toggle vendor checkbox
  const toggleVendorCheck = (vendorIndex) => {
    const updatedProducts = [...products];
    const vendor = updatedProducts[vendorIndex];
    vendor.checked = !vendor.checked;

    // Update all items under this vendor
    vendor.items.forEach((item) => {
      item.checked = vendor.checked;
    });

    setProducts(updatedProducts);
  };

  const deleteCheckedItems = () => {
    const checkedItems = products.flatMap((vendor) =>
      vendor.items.filter((item) => item.checked)
    );

    if (checkedItems.length === 0) {
      // Optional: Show a toast notification instead
      console.log("No items selected");
      return;
    }

    setItemsToDelete(checkedItems);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedProducts = products
      .map((vendor) => ({
        ...vendor,
        items: vendor.items.filter((item) => !item.checked),
      }))
      .filter((vendor) => vendor.items.length > 0);

    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
    // Optional: Show success toast here
  };

  // Format price with currency
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  // Remove an individual item
  const removeItem = (vendorIndex, itemIndex) => {
    const updatedProducts = [...products];
    updatedProducts[vendorIndex].items.splice(itemIndex, 1);

    // Remove vendor if no items left
    const filteredProducts = updatedProducts.filter(
      (vendor) => vendor.items.length > 0
    );

    setProducts(filteredProducts);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-grow">
          <div className="mb-8">
            <div className="hidden md:grid grid-cols-12 gap-4 border-black border-b pb-2 items-center mb-4">
              <div className="col-span-5 font-medium py-3">Product</div>
              <div className="col-span-2 font-medium text-center py-3">
                Quantity
              </div>
              <div className="col-span-2 font-medium text-center py-3">
                Price
              </div>
              <div className="col-span-2 font-medium text-center py-3">
                Subtotal
              </div>
              <div className="col-span-1 ">
                {hasCheckedItems && (
                  <>
                    <button
                      onClick={deleteCheckedItems}
                      className="flex p-2 text-lg items-center gap-1 text-white rounded hover:ring-1 hover:ring-red-600"
                      title="Delete selected items"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>

                    <DeleteConfirmationModal
                      isOpen={isDeleteModalOpen}
                      onClose={() => setIsDeleteModalOpen(false)}
                      onConfirm={handleConfirmDelete}
                      items={itemsToDelete}
                    />
                  </>
                )}
              </div>
            </div>

            {products.length > 0 ? (
              products.map((vendorGroup, vendorIndex) => (
                <div key={vendorIndex} className="mb-8">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={vendorGroup.checked}
                      onChange={() => toggleVendorCheck(vendorIndex)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium text-yellow-500">
                      {vendorGroup.vendor}
                    </span>
                  </div>

                  {vendorGroup.items.map((item, itemIndex) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b py-4"
                    >
                      <div className="pl-2 col-span-5 flex items-center">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() =>
                            toggleItemCheck(vendorIndex, itemIndex)
                          }
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="ml-6">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500">Color: {item.color}</p>
                          <p className="text-gray-500 text-sm">
                            Available: {item.initialStock}
                          </p>
                          <div className="mt-2">
                            <button
                              onClick={() => removeItem(vendorIndex, itemIndex)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              X Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            className={`px-3 py-1 text-lg ${
                              item.quantity <= 1
                                ? "text-gray-400 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              updateQuantity(
                                vendorIndex,
                                itemIndex,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x">
                            {item.quantity}
                          </span>
                          <button
                            className={`px-3 py-1 text-lg ${
                              item.quantity >= item.initialStock
                                ? "text-gray-400 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              updateQuantity(
                                vendorIndex,
                                itemIndex,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity >= item.initialStock}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        {formatPrice(item.price)}
                      </div>
                      <div className="col-span-2 text-center font-medium">
                        ${calculateSubtotal(item)}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-xl text-gray-500">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-80">
          <div className="h-fit w-full p-6 border-gray-500 border rounded-lg shadow-xl bg-white">
            <h2 className="text-xl font-medium font-poppins mb-4">
              Cart summary
            </h2>

            <div className="space-y-3 mb-6 py-4">
              <div className="flex items-center p-2 border border-gray-300 rounded-md active:bg-gray-500 hover:ring-1 hover:ring-gray-900">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => setSelectedPayment("cod")}
                  checked={selectedPayment === "cod"}
                />
                <label htmlFor="cod" className="ml-2">
                  Cash on delivery
                </label>
              </div>

              <div className="flex items-center p-2 border border-gray-300 rounded-md active:bg-gray-500 hover:ring-1 hover:ring-gray-900">
                <input
                  type="radio"
                  id="payNow"
                  name="payment"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => setSelectedPayment("payNow")}
                  checked={selectedPayment === "payNow"}
                />
                <label htmlFor="payNow" className="ml-2">
                  Pay Now Through Qr
                </label>
              </div>
            </div>

            <div className="border-t py-4 my-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-lg font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-85 disabled:cursor-not-allowed"
              disabled={products.length === 0 || !selectedPayment}
            >
              Checkout
            </button>

            {selectedPayment === "cod" ? (
              <CODPurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => setIsPurchaseModalOpen(false)}
                cartItems={products.filter((vendor) => vendor.items.length > 0)}
                total={total}
              />
            ) : (
              <PurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => setIsPurchaseModalOpen(false)}
                cartItems={products.filter((vendor) => vendor.items.length > 0)}
                total={total}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
