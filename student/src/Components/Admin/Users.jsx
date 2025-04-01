import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch("http://localhost:5000/auth/update-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const data = await response.json();
      alert(data.message);
      fetchUsers(); // Refresh user list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center border-b hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border font-semibold capitalize">{user.role}</td>
                  <td className="py-2 px-4 border">
                    {user.role === "user" ? (
                      <button
                        onClick={() => updateUserRole(user.id, "admin")}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserRole(user.id, "user")}
                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700"
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
