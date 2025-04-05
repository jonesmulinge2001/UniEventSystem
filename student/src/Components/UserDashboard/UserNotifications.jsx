import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Announcements = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('http://localhost:5000/admin/notifications')
        const data = await res.json()
        console.log('Fetched data:', data)

        let uniqueNotifications = []

        if (data.notifications && data.notifications.length > 0) {
          const seenMessages = new Set()
          uniqueNotifications = data.notifications.filter(note => {
            if (!seenMessages.has(note.message)) {
              seenMessages.add(note.message)
              return true
            }
            return false
          })
        }

        setNotifications(uniqueNotifications)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  // Function to mark notification as read
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/notifications/read/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setNotifications(prev =>
          prev.map(note =>
            note.id === id ? { ...note, status: 'read' } : note
          )
        )
      } else {
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  // Function to delete notification
  const deleteNotification = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/notifications/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setNotifications(prev => prev.filter(note => note.id !== id));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  return (
    <div className="px-4 py-6 -mt-8 md:px-4 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Event Notifications</h2>

      {loading ? (
        <div className="text-center text-gray-500 animate-pulse">Loading announcements...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500">No announcements available.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {notifications.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-md p-4 border transition-all duration-300 ${
                  note.status === 'read' ? 'border-gray-200' : 'border-blue-300'
                }`}
              >
                <h3 className="text-lg font-bold text-blue-700 mb-2">{note.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{note.message}</p>
                <div className="text-sm text-gray-400 mt-3">{note.date}</div>

                {note.status !== 'read' && (
                  <button
                    onClick={() => markAsRead(note.id)}
                    className="mt-4 px-4 py-1 text-sm bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(note.id)}
                  className="mt-2 ml-2 px-4 py-1 text-sm bg-red-500 text-white cursor-pointer rounded-full hover:bg-red-600 transition"
                >
                  Delete
                </button>

                {note.status === 'read' && (
                  <span className="mt-4 inline-block text-xs text-green-500 font-semibold">Read</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default Announcements
