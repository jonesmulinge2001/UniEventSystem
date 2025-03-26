import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios
        .delete(`http://localhost:5000/events/${id}`)
        .then(() => setEvents(events.filter((event) => event.id !== id)))
        .catch((error) => console.error("Error deleting event:", error));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
          >
            <h3 className="text-lg font-semibold truncate">{event.title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
            <p className="text-sm text-gray-500">📅 {new Date(event.date).toDateString()}</p>
            <p className="text-sm text-gray-500">📍 {event.location}</p>
            <div className="mt-3 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
