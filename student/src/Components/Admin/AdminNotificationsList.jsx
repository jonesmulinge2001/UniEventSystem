import React, { useState, useEffect } from 'react';

const AdminNotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  // Fetch notifications when component loads
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/admin/notifications');
      const data = await response.json();

      // ✅ Keep only unique messages
      const uniqueNotifications = Array.from(
        new Map(data.notifications.map(item => [item.message, item])).values()
      );

      setNotifications(uniqueNotifications);
    } catch (error) {
      console.error("Couldn't fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  // Delete a notification using event_id
  const handleDelete = async (eventId) => {
    try {
      await fetch(`http://localhost:5000/admin/notifications/delete/${eventId}`, {
        method: 'DELETE',
      });
      setNotifications(notifications.filter(item => item.event_id !== eventId));
    } catch (error) {
      console.error("Couldn't delete notification:", error);
    }
  };

  // Update a notification using event_id
  const handleUpdate = async (eventId) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/admin/notifications/update/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editMessage }),
      });
      setNotifications(notifications.map(item => 
        item.event_id === eventId ? { ...item, message: editMessage } : item
      ));
      setEditId(null); // Exit edit mode
    } catch (error) {
      console.error("Couldn't update notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // Split notifications into groups of 10 for display
  const groupedNotifications = [];
  for (let i = 0; i < notifications.length; i += 10) {
    groupedNotifications.push(notifications.slice(i, i + 10));
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h2 className="text-2xl font-bold text-center mb-8">Admin Notifications</h2>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No notifications found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedNotifications.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              {/* First row of 5 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {group.slice(0, 5).map(notification => (
                  <NotificationCard
                    key={notification.event_id}
                    notification={notification}
                    editId={editId}
                    editMessage={editMessage}
                    setEditMessage={setEditMessage}
                    setEditId={setEditId}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    loading={loading}
                  />
                ))}
              </div>
              
              {/* Second row of 5 (if exists) */}
              {group.length > 5 && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {group.slice(5, 10).map(notification => (
                    <NotificationCard
                      key={notification.event_id}
                      notification={notification}
                      editId={editId}
                      editMessage={editMessage}
                      setEditMessage={setEditMessage}
                      setEditId={setEditId}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                      loading={loading}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Separate component for notification card to keep code clean
const NotificationCard = ({
  notification,
  editId,
  editMessage,
  setEditMessage,
  setEditId,
  handleUpdate,
  handleDelete,
  loading
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {editId === notification.event_id ? (
        <div className="space-y-2">
          <textarea
            className="w-full border rounded p-2 text-sm"
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            rows="3"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdate(notification.event_id)}
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setEditId(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-800">{notification.message}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditId(notification.event_id);
                setEditMessage(notification.message);
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(notification.event_id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationsList;