import React, { useState } from "react";

const API_BASE = "http://localhost:5000";

export default function AIPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/ai-insights`);
      const result = await res.json();

      setData(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-bold">Insights</h2>

        <button
          onClick={generateInsights}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Insights"}
        </button>

        {/* RESULTS */}
        {data && (
          <div className="mt-6 space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 p-3 rounded">
                <p className="text-sm text-gray-500">Total Units</p>
                <p className="text-lg font-bold">{data.totalUnits}</p>
              </div>

              <div className="bg-slate-100 p-3 rounded">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-lg font-bold">₹{data.totalValue}</p>
              </div>
            </div>

            {/* Low Stock */}
            <div>
              <h4 className="font-semibold text-red-600">Low Stock</h4>
              {data.lowStock.length === 0 ? (
                <p className="text-gray-500 text-sm">No low stock items</p>
              ) : (
                data.lowStock.map((i, idx) => (
                  <p key={idx}>• {i.name} (Qty: {i.qty})</p>
                ))
              )}
            </div>

            {/* Overstock */}
            <div>
              <h4 className="font-semibold text-orange-600">Overstock</h4>
              {data.overStock.length === 0 ? (
                <p className="text-gray-500 text-sm">No overstock items</p>
              ) : (
                data.overStock.map((i, idx) => (
                  <p key={idx}>• {i.name} (Qty: {i.qty})</p>
                ))
              )}
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold text-green-600">Suggestions</h4>
              {data.suggestions.map((s, idx) => (
                <p key={idx}>✔ {s}</p>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}