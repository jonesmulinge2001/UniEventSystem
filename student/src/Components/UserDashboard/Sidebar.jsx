import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaSignOutAlt, FaBars, FaBell } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/login");
  }

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
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-60 p-6 shadow-lg ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/home" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/registeredevents" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <FaCalendarAlt />
              <span>Registered Events</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <FaUser />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <FaBell />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <button onClick={handleNavigate} className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
