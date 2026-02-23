import React, { useState, useEffect } from "react";

const ItemModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    location: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    }
  }, [editingItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({ ...form, id: editingItem?.id || Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-3">
        <h2 className="text-xl font-bold">
          {editingItem ? "Edit Item" : "Add Item"}
        </h2>

        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
