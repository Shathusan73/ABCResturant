import React, { useState } from "react";

function OrderForm({ menu, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log("Order submitted:", menu, quantity);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Order {menu.name}</h2>
        <form onSubmit={handleOrderSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-black py-2 px-4 rounded-lg"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
