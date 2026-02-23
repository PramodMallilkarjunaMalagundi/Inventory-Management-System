import React, { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

import AuthScreen from "./components/AuthScreen";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import InventoryList from "./components/InventoryList";
import ActivityLog from "./components/ActivityLog";
import MasterDataManager from "./components/MasterDataManager";
import AIPanel from "./components/AIPanel";
import SettingsView from "./components/SettingsView";

const API_BASE = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  // ⭐ dropdown state
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  /* 🔐 CHECK LOGIN SESSION FROM BACKEND */
  useEffect(() => {
    fetch(`${API_BASE}/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No session");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  /* 🔽 close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ✅ LOGIN */
  const handleLogin = (u) => {
    setUser(u);
  };

  /* 🚪 LOGOUT */
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log("Logout API not implemented");
    }
    setUser(null);
  };

  /* 📄 PAGE RENDERER */
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "stock":
        return <InventoryList user={user} />;

      case "activity":
        return <ActivityLog />;

      case "categories":
        return <MasterDataManager type="category" />;

      case "ai":
        return <AIPanel />;

      case "settings":
        return <SettingsView user={user} onLogout={handleLogout} />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {user ? (
        <div className="flex h-screen bg-slate-100 overflow-hidden">

          {/* 🧭 Sidebar */}
          <Sidebar
            onLogout={handleLogout}
            setPage={setPage}
            currentPage={page}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          {/* 📦 RIGHT SIDE */}
          <div className="flex-1 flex flex-col">

            {/* 🔥 TOP NAVBAR */}
            <div className="h-14 bg-white border-b flex items-center justify-between px-5 shadow-sm">

              {/* LEFT */}
              <div className="flex items-center gap-4">
                <Menu
                  size={22}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setCollapsed(!collapsed)}
                />

                <h2 className="text-gray-500 font-semibold tracking-wide uppercase">
                  {page === "dashboard" && "Dashboard"}
                  {page === "stock" && "Stock Items"}
                  {page === "activity" && "Activity Log"}
                  {page === "categories" && "Categories"}
                  {page === "ai" && "AI Insights"}
                  {page === "settings" && "Settings"}
                </h2>
              </div>

              {/* RIGHT USER DROPDOWN */}
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-md transition"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shadow">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Name + role */}
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* 🔽 DROPDOWN MENU */}
                {openMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-md overflow-hidden z-50">

                    <button
                      onClick={() => {
                        setPage("settings");
                        setOpenMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      ⚙️ Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}
              </div>

            </div>

            {/* 📄 CONTENT */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderPage()}
            </div>

          </div>
        </div>
      ) : (
        <AuthScreen onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;