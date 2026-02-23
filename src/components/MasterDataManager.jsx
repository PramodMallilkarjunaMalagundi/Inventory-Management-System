import React, { useState } from "react";

const MasterDataManager = ({ type, data = [], setData }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    const newItem = {
      id: Date.now(),
      name: input,
    };

    setData([...data, newItem]);
    setInput("");
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold capitalize">{type} Manager</h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add ${type}`}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-gray-100 p-2 rounded"
          >
            {item.name}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MasterDataManager;
