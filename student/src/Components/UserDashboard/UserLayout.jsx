import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // User Sidebar

const UserLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 ml-60 bg-gray-100 overflow-auto">
        <Outlet /> {/* This renders the selected route component */}
      </div>
    </div>
  );
};

export default UserLayout;
