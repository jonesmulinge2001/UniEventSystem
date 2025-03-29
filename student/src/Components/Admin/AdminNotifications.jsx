import React, { useState, useEffect } from 'react';

const AdminNotifications = () => {
  const [message, setMessage] = useState('');
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [error, setError] = useState('');

  // Fetch available events for the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();

        console.log("📡 Events fetched:", data); // ✅ Debugging log
        setEvents(Array.isArray(data) ? data : []); // ✅ Ensure events is always an array
      } catch (error) {
        console.error("❌ Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setEvents([]); // ✅ Prevent map error
      }
    };
    fetchEvents();
  }, []);

  // Send notification to all users
  const sendNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');
    setError('');

    try {
      console.log("📡 Sending notification with data:", { event_id: eventId || null, message });

      const res = await fetch('http://localhost:5000/admin/send-to-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventId || null, message }),
      });

      const data = await res.json();
      console.log("✅ Response received:", data);

      if (res.ok) {
        setResponseMsg(data.message);
        setMessage('');
        setEventId('');
      } else {
        setError(data.error || 'Failed to send notification');
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Send Notification</h2>
      {responseMsg && <p className="text-center text-green-600">{responseMsg}</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <form onSubmit={sendNotification} className="space-y-4">
        <div>
          <label className="block font-medium">Message:</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Select Event:</label>
          <select 
            value={eventId} 
            onChange={(e) => setEventId(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">None</option>
            {Array.isArray(events) && events.length > 0 ? (
              events.map(event => (
                <option key={event.id} value={event.id}>{event.title || "Unnamed Event"}</option>
              ))
            ) : (
              <option disabled>No events available</option>
            )}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
};

export default AdminNotifications;
