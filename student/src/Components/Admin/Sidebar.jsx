import { BarChart, Calendar, MessageCircle, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="bg-blue-600 text-white h-screen p-5 pt-8 fixed left-0 top-0 w-64">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-4">
          <NavLink to="/admin/events" className={({ isActive }) => `flex items-center gap-4 p-2 rounded-md ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}> 
            <Calendar className="text-xl" />
            <span>Manage Events</span>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-4 p-2 rounded-md ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}> 
            <Users className="text-xl" />
            <span>Users</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={({ isActive }) => `flex items-center gap-4 p-2 rounded-md ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}> 
            <BarChart className="text-xl" />
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/admin/user" className={({ isActive }) => `flex items-center gap-4 p-2 rounded-md ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`}> 
            <MessageCircle className="text-xl" />
            <span>User Messages</span>
          </NavLink>
        </nav>
      </div>
      <div className="flex-1 p-10 ml-64"> 
        <Outlet /> {/* Renders the selected route's component */}
      </div>
    </div>
  );
};

export default Sidebar;
