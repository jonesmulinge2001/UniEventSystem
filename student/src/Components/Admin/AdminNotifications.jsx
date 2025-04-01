import React, { useState, useEffect } from "react";

const AdminNotifications = () => {
  const [message, setMessage] = useState("");
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");

  // Fetch available events for the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        console.log("📡 Events fetched:", data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  // Send notification to all users
  const sendNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setError("");

    try {
      console.log("📡 Sending notification:", { event_id: eventId || null, message });

      const res = await fetch("http://localhost:5000/admin/send-to-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: eventId || null, message }),
      });

      const data = await res.json();
      console.log("✅ Response received:", data);

      if (res.ok) {
        setResponseMsg(data.message);
        setMessage("");
        setEventId("");
      } else {
        setError(data.error || "Failed to send notification");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Send Notification</h2>

        {responseMsg && <p className="text-center text-green-600">{responseMsg}</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <form onSubmit={sendNotification} className="space-y-4">
          {/* Message Input */}
          <div>
            <label className="block font-medium text-gray-700">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              placeholder="Type your notification message..."
              rows="3"
            ></textarea>
          </div>

          {/* Event Select Dropdown */}
          <div>
            <label className="block font-medium text-gray-700">Select Event:</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            >
              <option value="">None</option>
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title || "Unnamed Event"}
                  </option>
                ))
              ) : (
                <option disabled>No events available</option>
              )}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-lg font-medium transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNotifications;
