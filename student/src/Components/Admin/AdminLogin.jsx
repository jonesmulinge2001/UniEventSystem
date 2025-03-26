import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/admin/sidebar"); // Redirect after login
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex flex-col items-center">
          <FaUserShield className="text-5xl text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Admin Login</h2>
        </div>

        {error && <p className="mt-3 text-red-600 text-center">{error}</p>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <FaUserShield className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full rounded-lg border p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 text-white transition duration-300 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full rounded-lg border border-blue-600 p-3 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
          onClick={() => navigate("/admin/sidebar")}
        >
          Don't have an account? Register
        </motion.button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Only authorized admins can access this panel.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
