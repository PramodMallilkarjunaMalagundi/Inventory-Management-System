import React, { useState, useEffect } from "react";

const API_BASE = "https://inventory-management-system-backend-wrft.onrender.com";

export default function EditItemModal({ item, onClose, onUpdated }) {
  const [form, setForm] = useState(item);

  useEffect(() => {
    setForm(item);
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`${API_BASE}/items/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    onUpdated(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>

        <input name="name" value={form.name} onChange={handleChange} className="input" />
        <input name="brand" value={form.brand} onChange={handleChange} className="input mt-2" />
        <input name="location" value={form.location} onChange={handleChange} className="input mt-2" />
        <input name="quantity" value={form.quantity} onChange={handleChange} className="input mt-2" />
        <input name="price" value={form.price} onChange={handleChange} className="input mt-2" />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}