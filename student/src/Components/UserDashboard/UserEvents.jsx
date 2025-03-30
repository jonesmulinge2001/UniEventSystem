import React, { useEffect, useState } from "react";

const UserEvents = ({ regno }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/register/user-events/${regno}`); // ✅ Correct API route
        if (!response.ok) {
          throw new Error("Failed to fetch registered events");
        }
        const data = await response.json();
        setRegisteredEvents(data);
      } catch (err) {
        setError("Error fetching registered events");
      } finally {
        setLoading(false);
      }
    };

    if (regno) {
      fetchUserEvents();
    }
  }, [regno]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Your Registered Events</h2>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {registeredEvents.length === 0 && !loading && <p>No registered events found.</p>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {registeredEvents.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{event.name}</h3> {/* ✅ Use correct DB field name */}
            <p className="text-sm text-gray-600">{event.date} - {event.venue}</p> {/* ✅ Use correct DB field name */}
            <p className="text-sm text-gray-700 mt-2">{event.details}</p> {/* ✅ Use correct DB field name */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEvents;
