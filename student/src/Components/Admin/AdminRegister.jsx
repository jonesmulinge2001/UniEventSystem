import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "admin" }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      alert("Admin registered successfully!");
      navigate("/admin/login"); // Redirect to login after registration
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <h2 className="text-center text-xl font-bold text-gray-800 mb-4">Admin Registration</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input whileFocus={{ scale: 1.02 }} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
          <motion.input whileFocus={{ scale: 1.02 }} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
          <motion.input whileFocus={{ scale: 1.02 }} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" />
          
          {/* Register Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full border border-blue-600 text-blue-600 p-2 rounded hover:bg-blue-600 hover:text-white"
          onClick={() => navigate("/admin/login")}
        >
          Already have an account? Login
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AdminRegister;
