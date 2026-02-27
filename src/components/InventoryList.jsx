import React, { useState, useEffect } from "react";
import EditItemModal from "./EditItemModal";

const API_BASE = "https://inventory-management-system-backend-wrft.onrender.com";

const InventoryList = ({ user }) => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [editingItem, setEditingItem] = useState(null);

  /* 📥 LOAD ITEMS */
  useEffect(() => {
    fetch(`${API_BASE}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  /* ➕ ADD ITEM */
  const addItem = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        brand,
        location,
        quantity,
        price,
      }),
    });

    const data = await res.json();

    // 🔥 FIX: backend returns item directly (not data.item)
    setItems([data, ...items]);

    setName("");
    setBrand("");
    setLocation("");
    setQuantity("");
    setPrice("");
  };

  /* ❌ DELETE ITEM */
  const deleteItem = async (id) => {
    await fetch(`${API_BASE}/items/${id}`, {
      method: "DELETE",
    });

    setItems(items.filter((item) => item._id !== id));
  };

  /* ✏️ EDIT HANDLERS */
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdated = (updatedItem) => {
    setItems((prev) =>
      prev.map((i) => (i._id === updatedItem._id ? updatedItem : i))
    );
  };

  return (
    <div className="space-y-6">

      {/* ⭐ ADMIN ONLY ADD FORM */}
      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Add Inventory Item</h2>

          <form onSubmit={addItem} className="grid grid-cols-2 gap-4">
            <input
              placeholder="Product Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              placeholder="Brand"
              className="border p-2 rounded"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <input
              placeholder="Location"
              className="border p-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button className="col-span-2 bg-blue-600 text-white py-2 rounded">
              ➕ Add Item
            </button>
          </form>
        </div>
      )}

      {/* 📦 INVENTORY TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Inventory Items</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Brand</th>
              <th className="p-2">Location</th>
              <th className="p-2">Units</th>
              <th className="p-2">Price</th>
              {user?.role === "admin" && <th className="p-2">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.brand}</td>
                <td className="p-2">{item.location}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">₹{item.price}</td>

                {user?.role === "admin" && (
                 <td className="p-3">
  <div className="flex items-center gap-4">

    <button
      onClick={() => handleEdit(item)}
      className="px-2.5 py-1 text-xs border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 transition"
    >
       Edit
    </button>

    <button
      onClick={() => deleteItem(item._id)}
      className="px-2.5 py-1 text-xs border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition"
    >
       Delete
    </button>

  </div>
</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✨ EDIT MODAL */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdated={handleUpdated}
        />
      )}

    </div>
  );
};

export default InventoryList;
