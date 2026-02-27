import React, { useState } from "react";

const API_BASE = "https://inventory-management-system-backend-wrft.onrender.com";

export default function SettingsView({ user, onLogout }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name,
          newEmail: email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Password updated successfully 🔒");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`${API_BASE}/user/delete/${user.email}`, {
        method: "DELETE",
      });

      alert("Account deleted");
      onLogout();
    } catch (err) {
      alert("Error deleting account");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded text-sm">
            {message}
          </div>
        )}

        {/* ================= PROFILE ================= */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Profile Information
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Full Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Email Address"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>

        <hr />

        {/* ================= PASSWORD ================= */}
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-3">
            Change Password
          </h3>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </div>

        <hr />

        {/* ================= DANGER ZONE ================= */}
        <div>
          <h3 className="text-md font-semibold text-red-600 mb-2">
            Danger Zone
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            Deleting your account will permanently remove all your data.
          </p>

          <button
            onClick={handleDeleteAccount}
            className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
}