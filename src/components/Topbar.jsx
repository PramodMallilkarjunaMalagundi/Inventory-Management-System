export default function Topbar({ user }) {
  return (
    <div className="bg-[#0B1A2B] text-white px-6 py-3 flex justify-between items-center shadow">

      {/* Title */}
      <h1 className="text-lg font-semibold">InvenTrack</h1>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Alerts */}
        <div className="text-red-400 font-semibold text-sm">
          🔔 0 Alerts
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-full">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="text-sm">
            <p className="font-semibold">{user?.name || "Admin User"}</p>
            <p className="text-xs text-gray-300 uppercase">ADMIN</p>
          </div>
        </div>

      </div>
    </div>
  );
}
