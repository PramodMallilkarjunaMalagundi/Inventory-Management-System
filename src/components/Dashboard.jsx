import React, { useEffect, useState } from "react";
import {
  Bar,
  Pie,
  Doughnut
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const API = "http://localhost:5000";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // 📊 PREPARE DATA
  const names = items.map(i => i.name);
  const quantities = items.map(i => i.quantity);
  const values = items.map(i => i.price * i.quantity);

  const low = items.filter(i => i.quantity < 10).length;
  const normal = items.filter(i => i.quantity >= 10 && i.quantity <= 100).length;
  const over = items.filter(i => i.quantity > 100).length;

  /* 📊 BAR CHART */
  const barData = {
    labels: names,
    datasets: [
      {
        label: "Stock Quantity",
        data: quantities,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  /* 🥧 PIE CHART */
  const pieData = {
    labels: names,
    datasets: [
      {
        label: "Inventory Value",
        data: values,
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
        ],
      },
    ],
  };

  /* 🍩 DOUGHNUT */
  const doughnutData = {
    labels: ["Low Stock", "Normal", "Overstock"],
    datasets: [
      {
        data: [low, normal, over],
        backgroundColor: ["#ef4444", "#10b981", "#f59e0b"],
      },
    ],
  };

  return (
  <div className="space-y-6">

    {/* 🔷 TOP STATS */}
    <div className="grid grid-cols-4 gap-4">

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Total Products</p>
        <h2 className="text-2xl font-bold">{items.length}</h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Total Units</p>
        <h2 className="text-2xl font-bold">
          {quantities.reduce((a, b) => a + b, 0)}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Low Stock</p>
        <h2 className="text-2xl font-bold text-red-500">{low}</h2>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Total Value</p>
        <h2 className="text-2xl font-bold">
          ₹{values.reduce((a, b) => a + b, 0)}
        </h2>
      </div>

    </div>

    {/* 📊 MAIN CHARTS ROW */}
    <div className="grid grid-cols-2 gap-5">

      {/* BAR CHART */}
      <div className="bg-white rounded-xl shadow p-4 h-[320px] flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Stock Quantity
        </h3>

        <div className="flex-1">
          <Bar
            data={barData}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      {/* PIE CHART */}
      <div className="bg-white rounded-xl shadow p-4 h-[320px] flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Inventory Value
        </h3>

        <div className="flex-1 flex items-center justify-center">
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>

    </div>

    {/* 🍩 STOCK HEALTH (CENTERED SMALL CARD) */}
    <div className="flex justify-center">

      <div className="bg-white rounded-xl shadow p-4 w-[320px] h-[320px] flex flex-col">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">
          Stock Health
        </h3>

        <div className="flex-1 flex items-center justify-center">
          <Doughnut
            data={doughnutData}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>

    </div>

  </div>
);
}