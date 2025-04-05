import React, { useEffect, useState } from "react";

// Popup modal for Update Event
const EventModal = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Ensure the token exists
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate({ ...event, ...formData }); // Update the event in the UI
        onClose(); // Close the modal after successful update
      } else {
        const errorData = await response.json();
        console.error("Failed to update event:", errorData);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Update Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Event Title"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Event Description"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Event Location"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Events page
const Events = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Fetching events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handling event delete
  const performDelete = async (id) => {
    if (window.confirm("Do you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:5000/events/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setEvents(events.filter((event) => event.id !== id));
        } else {
          console.error("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Opening the update event modal
  const handleUpdateClick = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  // Handling event update in the UI after successful update
  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <button
                onClick={() => handleUpdateClick(event)}
                className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => performDelete(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for updating event */}
      {isModalOpen && (
        <EventModal
          event={currentEvent}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleEventUpdate}
        />
      )}
    </div>
  );
};

export default Events;
