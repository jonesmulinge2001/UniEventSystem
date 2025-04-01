import { useState } from "react";
import { BarChart, Calendar, MessageCircle, Users, CalendarPlus } from "lucide-react";
import { FaBell, FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white h-screen p-5 pt-8 fixed left-0 top-0 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl md:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaBars />
        </button>

        {/* Sidebar Title */}
        {!isCollapsed && <h1 className="text-xl font-bold mb-6">Admin Panel</h1>}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin/dashboard/events"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <Calendar className="text-xl" />
            {!isCollapsed && <span>Manage Events</span>}
          </NavLink>

          <NavLink
            to="/admin/dashboard/addevent"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <CalendarPlus className="text-xl" />
            {!isCollapsed && <span>Add Event</span>}
          </NavLink>

          <NavLink
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <Users className="text-xl" />
            {!isCollapsed && <span>Users</span>}
          </NavLink>

          <NavLink
            to="/admin/dashboard/notifications"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <FaBell className="text-xl" />
            {!isCollapsed && <span>Send Notifications</span>}
          </NavLink>

          <NavLink
            to="/admin/dashboard/notificationslist"
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`
            }
          >
            <FaBell className="text-xl" />
            {!isCollapsed && <span>All Notifications</span>}
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-10 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
