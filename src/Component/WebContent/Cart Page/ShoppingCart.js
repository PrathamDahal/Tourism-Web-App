import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import DeleteConfirmationModal from "../../DeleteModal";
import PurchaseModal from "./QrPurchaseModal";
import CODPurchaseModal from "./CODPurchaseModal";
import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
} from "../../../Services/cartSlice";

const ShoppingCartPage = () => {
  // RTK Query hooks
  const { data: cartData, isLoading, isError, refetch } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();
  const [addToCart] = useAddToCartMutation();

  const [products, setProducts] = useState([]);
  const [hasCheckedItems, setHasCheckedItems] = useState(false);
  const [total, setTotal] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  // Transform API data to match component's structure
  useEffect(() => {
    if (cartData) {
      const transformedData = transformCartData(cartData);
      setProducts(transformedData);
    }
  }, [cartData]);

  // Helper function to transform API data
  const transformCartData = (apiData) => {
    // Check if apiData exists and has an items array
    if (!apiData || !apiData.items || !Array.isArray(apiData.items)) {
      console.error("Invalid cart data structure:", apiData);
      return [];
    }

    // Group items by vendor (since vendor is missing in this data structure,
    // we'll create a default vendor)
    const defaultVendor = {
      vendorId: "default",
      vendor: "Store",
      items: [],
      checked: false,
    };

    // Process each item in the items array
    apiData.items.forEach((item) => {
      if (!item || !item.product) {
        console.warn("Skipping invalid cart item:", item);
        return;
      }

      defaultVendor.items.push({
        id: item._id,
        productId: item.product._id,
        name: item.product.name,
        color: item.product.color || "N/A",
        quantity: item.quantity,
        price: item.product.price,
        initialStock: item.product.stock || 10,
        checked: false,
      });
    });

    return defaultVendor.items.length > 0 ? [defaultVendor] : [];
  };

  // Calculate total and checked items
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
  const updateQuantity = async (vendorIndex, itemIndex, newQuantity) => {
    // Create a deep copy of the products array
    const updatedProducts = JSON.parse(JSON.stringify(products));
    const item = updatedProducts[vendorIndex].items[itemIndex];

    // Convert to number in case it's a string
    newQuantity = Number(newQuantity);

    // Validate new quantity - this is the crucial fix
    if (
      isNaN(newQuantity) ||
      newQuantity < 1 ||
      newQuantity > item.initialStock
    ) {
      return; // Exit if invalid
    }

    // Optimistic UI update
    item.quantity = newQuantity;
    setProducts(updatedProducts);

    try {
      await addToCart({
        productId: item.productId,
        quantity: newQuantity,
      });
      refetch(); // Sync with server
    } catch (error) {
      console.error("Failed to update quantity:", error);
      // Revert on error
      refetch(); // Get fresh data from server
    }
  };

  // Toggle item checkbox
  const toggleItemCheck = (vendorIndex, itemIndex) => {
    const updatedProducts = [...products];
    const item = updatedProducts[vendorIndex].items[itemIndex];
    item.checked = !item.checked;

    const vendor = updatedProducts[vendorIndex];
    vendor.checked = vendor.items.every((item) => item.checked);

    setProducts(updatedProducts);
  };

  // Toggle vendor checkbox
  const toggleVendorCheck = (vendorIndex) => {
    const updatedProducts = [...products];
    const vendor = updatedProducts[vendorIndex];
    vendor.checked = !vendor.checked;

    vendor.items.forEach((item) => {
      item.checked = vendor.checked;
    });

    setProducts(updatedProducts);
  };

  // Clear entire cart
  const handleClearCart = async () => {
    setIsClearCartModalOpen(false);
    try {
      await clearCart();
      refetch();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // Prepare selected items for deletion
  const prepareDeleteCheckedItems = () => {
    const checkedItems = products.flatMap((vendor) =>
      vendor.items.filter((item) => item.checked)
    );

    if (checkedItems.length === 0) {
      console.log("No items selected");
      return;
    }

    setItemsToDelete(checkedItems);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion of selected items
  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      await Promise.all(
        itemsToDelete.map((item) => removeFromCart(item.productId))
      );
      refetch();
    } catch (error) {
      console.error("Failed to delete items:", error);
    }
  };

  // Format price with currency
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (isLoading) return <div>Loading cart...</div>;

  if (isError) return <div>Error loading cart data</div>;

  if (!cartData) return <div>No cart data available</div>;

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
              <div className="col-span-1">
                {hasCheckedItems && (
                  <button
                    onClick={prepareDeleteCheckedItems}
                    className="flex p-2 text-lg items-center gap-1 text-white rounded hover:ring-1 hover:ring-red-600"
                    title="Delete selected items"
                  >
                    <FaTrashAlt className="text-red-500" />
                  </button>
                )}
                {products.length > 0 && (
                  <button
                    onClick={() => setIsClearCartModalOpen(true)}
                    className="flex p-2 text-lg items-center gap-1 text-white rounded hover:ring-1 hover:ring-red-600 mt-2"
                    title="Clear entire cart"
                  >
                    <FaShoppingCart className="text-red-500" />
                  </button>
                )}
              </div>
            </div>

            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              items={itemsToDelete || []} // Provide default empty array
              action="delete"
            />

            <DeleteConfirmationModal
              isOpen={isClearCartModalOpen}
              onClose={() => setIsClearCartModalOpen(false)}
              onConfirm={handleClearCart}
              title="Clear Entire Cart"
              message="Are you sure you want to remove all items from your cart?"
              action="clear"
            />

            {products.length > 0 ? (
              products.map((vendorGroup, vendorIndex) => (
                <div key={vendorGroup.vendorId} className="mb-8">
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
                            onClick={() => {
                              if (item.quantity > 1) {
                                // Additional client-side check
                                updateQuantity(
                                  vendorIndex,
                                  itemIndex,
                                  item.quantity - 1
                                );
                              }
                            }}
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
                            onClick={() => {
                              if (item.quantity < item.initialStock) {
                                // Additional client-side check
                                updateQuantity(
                                  vendorIndex,
                                  itemIndex,
                                  item.quantity + 1
                                );
                              }
                            }}
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
                cartItems={products}
                total={total}
              />
            ) : (
              <PurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => setIsPurchaseModalOpen(false)}
                cartItems={products}
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
