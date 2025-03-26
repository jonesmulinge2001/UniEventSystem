import React from "react";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 lg:ml-60 w-full max-w-screen-lg mx-auto text-center overflow-hidden">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-wrap break-words">
          Welcome to University Event Management System
        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-lg text-wrap break-words">
          Explore upcoming events and stay updated
        </p>
      </div>
    </div>
  );
};

export default Home;
