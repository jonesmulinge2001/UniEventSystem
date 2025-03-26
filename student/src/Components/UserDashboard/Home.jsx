import React from "react";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-60"> {/* Ensures content is pushed aside */}
        <h1 className="text-3xl font-bold">Welcome to University Event Management</h1>
        <p className="text-gray-600 mt-2">Explore upcoming events and stay updated.</p>
      </div>
    </div>
  );
};

export default Home;
