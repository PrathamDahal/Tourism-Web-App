import React from "react";

const ShoppingCart = () => {
  const products = [
    {
      vendor: "Bajrang Fashion Collection",
      items: [
        {
          name: "Tray Table",
          color: "Black",
          quantity: 2,
          price: "Rs. 19.00",
          subtotal: "$38.00",
        },
        {
          name: "Tray Table",
          color: "Black",
          quantity: 2,
          price: "$19.00",
          subtotal: "$38.00",
        },
      ],
    },
    {
      vendor: "Abc Chair House",
      items: [
        {
          name: "Tray Table",
          color: "Black",
          quantity: 2,
          price: "Rs. 19.00",
          subtotal: "$38.00",
        },
        {
          name: "Tray Table",
          color: "Black",
          quantity: 2,
          price: "$19.00",
          subtotal: "$38.00",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto px-4 md:px-6">
      <div className="mb-8">
        <div className="hidden md:grid grid-cols-12 gap-4 border-black border-b pb-2 mb-4">
          <div className="col-span-5 font-medium py-3">Product</div>
          <div className="col-span-2 font-medium text-center py-3">Quantity</div>
          <div className="col-span-2 font-medium text-center py-3">Price</div>
          <div className="col-span-2 font-medium text-center py-3">Subtotal</div>
          <div className="col-span-1 py-3"></div>
        </div>

        {products.map((vendorGroup, vendorIndex) => (
          <div key={vendorIndex} className="mb-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-medium text-yellow-500">{vendorGroup.vendor}</span>
            </div>

            {vendorGroup.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b py-4"
              >
                <div className="col-span-5 flex items-center">
                  <div className="ml-6">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Color: {item.color}</p>
                    <div className="col-span-1">
                      <button className="text-gray-500 hover:text-gray-700">
                        X Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border rounded-md">
                    <button className="px-3 py-1 text-lg">-</button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button className="px-3 py-1 text-lg">+</button>
                  </div>
                </div>

                <div className="col-span-2 text-center">{item.price}</div>
                <div className="col-span-2 text-center font-medium">
                  {item.subtotal}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ShoppingCart;
