import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/activity`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 Activity Logs from API:", data); // DEBUG
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Log</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-500">No activity found</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {log.action} -{" "}
                    <span className="text-blue-600">{log.item}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {log.quantity} • by {log.user}
                  </p>
                </div>

                <div className="text-sm text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}