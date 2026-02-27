import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "https://inventory-management-system-backend-wrft.onrender.com";

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // 🔹 VALIDATION FUNCTION
  const validateForm = () => {
    if (!email || !password) {
      return "Email and Password are required";
    }

    if (!isLogin && !name) {
      return "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const url = isLogin
        ? `${API_BASE}/login`
        : `${API_BASE}/register`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, email, password, role }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isLogin) {
        onLogin(data.user);
      } else {
        alert("Registered successfully. Please login.");
        setIsLogin(true);
        resetForm();
      }

      setLoading(false);
    } catch (err) {
      setError("Server not reachable");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#0b1f3a] to-[#081423]">

      {/* LEFT PANEL */}
      <div className="w-1/2 text-white flex flex-col justify-center px-20">
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} className="w-12 h-12" alt="logo" />
          <h1 className="text-3xl font-black">
            <span className="text-cyan-400">Inven</span>
            <span className="text-orange-500">Track</span>
          </h1>
        </div>

        <h2 className="text-5xl font-black mb-6 leading-tight">
          Smart Inventory <br />
          <span className="text-blue-400">Built for Growth.</span>
        </h2>

        <p className="text-gray-300 max-w-md text-lg">
          Add stock, Monitor movements, Get insights.
        </p>
        
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-gray-300 mb-6">
            {isLogin
              ? "Sign in to continue managing your inventory"
              : "Create your account to get started"}
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-500/20 text-red-300 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                />

                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-white/20 text-white border border-white/20 appearance-none focus:ring-2 focus:ring-cyan-400 outline-none"
                  >
                    <option value="user" className="text-black">User</option>
                    <option value="admin" className="text-black">Admin</option>
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white">
                    ▼
                  </span>
                </div>
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-white/20 text-white border border-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-white/20 text-white border border-white/20 pr-10 focus:ring-2 focus:ring-cyan-400 outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
            </button>

          </form>

          <p className="text-center text-gray-300 mt-6">
            {isLogin ? "Don't have account?" : "Already have account?"}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-cyan-400 ml-2 cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>

        </div>
      </div>
      <div className="absolute bottom-1 text-xs text-gray-400 w-full text-center">
  © 2026 InvenTrack · Inventory Management System
  <p className="mt-6 text-xs text-gray-600">
  Version 1.0 • InvenTrack System
</p>
</div>

    </div>
    
  );
}