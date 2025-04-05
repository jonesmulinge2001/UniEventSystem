import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar

function UserLayout() {
  return (
    <div className="flex">
      {/* Sidebar remains fixed */}
      <Sidebar />
      
      {/* Content area for dashboard pages */}
      <div className="flex-1 p-4 ml-[80px] md:ml-[240px]">
        <Outlet /> {/* This is where the pages will be rendered */}
      </div>
    </div>
  );
}

export default UserLayout;
