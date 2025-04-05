import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaSignOutAlt, FaBars, FaBell } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md md:hidden"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full bg-blue-700 text-white shadow-lg flex flex-col items-start p-4"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white mb-4 hidden md:block"
        >
          <FaBars size={20} />
        </button>
        
        <h2 className={`text-xl font-bold mb-8 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Dashboard</h2>
        <ul className="space-y-4 w-full">
          <li>
            <Link 
              to="/dashboard/home" 
              className="flex items-center space-x-3 hover:text-gray-300 transition"
            >
              <FaHome />
              {isOpen && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/registeredevents" 
              className="flex items-center space-x-3 hover:text-gray-300 transition"
            >
              <FaCalendarAlt />
              {isOpen && <span>Registered Events</span>}
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/dashboard/profile" 
              className="flex items-center space-x-3 hover:text-gray-300 transition"
            >
              <FaUser />
              {isOpen && <span>Profile</span>}
            </Link>
          </li> */}
          <li>
            <Link 
              to="/dashboard/notifications" 
              className="flex items-center space-x-3 hover:text-gray-300 transition"
            >
              <FaBell />
              {isOpen && <span>Notifications</span>}
            </Link>
          </li>
          <li>
            <button 
              onClick={handleNavigate} 
              className="flex items-center space-x-3 cursor-pointer hover:text-gray-300 transition"
            >
              <FaSignOutAlt />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
