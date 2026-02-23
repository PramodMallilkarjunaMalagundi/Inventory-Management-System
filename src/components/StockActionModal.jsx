import React, { useState } from "react";

const StockActionModal = ({ isOpen, onClose, onConfirm, type }) => {
  const [quantity, setQuantity] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold">
          {type === "in" ? "Stock In" : "Stock Out"}
        </h2>

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockActionModal;
