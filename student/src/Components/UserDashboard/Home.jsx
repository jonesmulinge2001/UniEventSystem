import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", regno: "", course: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();  
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regno || !formData.course) {
      alert("❌ Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventId: selectedEvent.id }),
      });

      const responseData = await response.json(); // Get the response JSON

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to register");
      }

      alert("✅ Registration successful!");
      setSelectedEvent(null);
      setFormData({ name: "", regno: "", course: "" });
    } catch (error) {
      alert(`❌ ${error.message}`); // Display the actual error message
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:-ml-12 w-full max-w-screen-xl -mt-6 mx-auto text-center overflow-hidden">
        <h1 className="text-xl md:text-2xl font-bold">Explore New Events</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-lg">Stay updated</p>

        {loading && <p className="mt-4 text-gray-500">Loading events...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
              <p className="text-sm text-gray-700 mt-2">{event.description}</p>
              <button 
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full max-w-xs"
                onClick={() => handleRegisterClick(event)}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Register for {selectedEvent.title}</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Your Name" 
                className="border p-2 rounded" 
                required
              />
              <input 
                type="text" 
                name="regno" 
                value={formData.regno} 
                onChange={handleInputChange} 
                placeholder="Registration Number" 
                className="border p-2 rounded" 
                required
              />
              <input 
                type="text" 
                name="course" 
                value={formData.course} 
                onChange={handleInputChange} 
                placeholder="Course" 
                className="border p-2 rounded" 
                required
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button 
                type="button" 
                className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
