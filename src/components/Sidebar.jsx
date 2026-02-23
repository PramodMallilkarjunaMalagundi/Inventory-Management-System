import {
  LayoutDashboard,
  Boxes,
  History,
  Tag,
  Brain,
  Settings,
  LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";

export default function Sidebar({
  onLogout,
  setPage,
  currentPage,
  collapsed,
}) {
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#081423] text-white flex flex-col justify-between shadow-xl transition-all duration-300`}
    >
      {/* 🔥 HEADER */}
      <div>
        <div className="flex items-center px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">

            {/* 🔹 LOGO (fixed size always) */}
            <img
              src={logo}
              alt="InvenTrack Logo"
              className="w-10 h-10 object-contain flex-shrink-0"
            />

            {/* 🔹 BRAND TEXT */}
            {!collapsed && (
              <h1
                className="leading-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                <span style={{ color: "#0891B2" }}>Inven</span>
                <span style={{ color: "#EA580C" }}>Track</span>
              </h1>
            )}
          </div>
        </div>

        {/* 📊 MENU ITEMS */}
        <div className="px-2 mt-4 space-y-3">

          <MenuItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            collapsed={collapsed}
            active={currentPage === "dashboard"}
            onClick={() => setPage("dashboard")}
          />

          {!collapsed && (
            <p className="text-[10px] text-gray-400 px-3 mt-4 tracking-widest font-semibold">
              CORE INVENTORY
            </p>
          )}

          <MenuItem
            icon={<Boxes size={18} />}
            label="Stock Items"
            collapsed={collapsed}
            active={currentPage === "stock"}
            onClick={() => setPage("stock")}
          />

          <MenuItem
            icon={<History size={18} />}
            label="Activity Log"
            collapsed={collapsed}
            active={currentPage === "activity"}
            onClick={() => setPage("activity")}
          />
          {!collapsed && (
            <p className="text-[10px] text-gray-400 px-3 mt-4 tracking-widest font-semibold">
              INTELLIGENCE
            </p>
          )}

          <MenuItem
            icon={<Brain size={18} />}
            label="Insights"
            collapsed={collapsed}
            active={currentPage === "ai"}
            onClick={() => setPage("ai")}
          />

          <MenuItem
            icon={<Settings size={18} />}
            label="Settings"
            collapsed={collapsed}
            active={currentPage === "settings"}
            onClick={() => setPage("settings")}
          />
        </div>
      </div>

      {/* 🔴 LOGOUT */}
      <MenuItem
        icon={<LogOut size={18} />}
        label="Sign Out"
        collapsed={collapsed}
        onClick={onLogout}
        isLogout
      />
    </div>
  );
}

/* 🔹 MENU ITEM WITH TOOLTIP */
function MenuItem({ icon, label, collapsed, active, onClick, isLogout }) {
  return (
    <div
      onClick={onClick}
      className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition
      ${active ? "bg-blue-600" : "hover:bg-slate-800"}
      ${isLogout ? "text-red-400 hover:bg-slate-800" : ""}`}
    >
      {icon}

      {!collapsed && <span>{label}</span>}

      {/* 🔥 TOOLTIP (only when collapsed) */}
      {collapsed && (
        <span
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 
          bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg"
        >
          {label}
        </span>
      )}
    </div>
  );
}
