import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    course: "",
  });

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

  const handleRegisterClick = (event) => setSelectedEvent(event);
  const handleClosePopup = () => {
    setSelectedEvent(null);
    setFormData({ name: "", regno: "", course: "" });
  };
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to register");
      alert("✅ Registration successful!");
      handleClosePopup();
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 w-full">
        <h1 className="text-xl md:text-2xl font-bold text-center">Explore University Events 🎉</h1>
        <p className="text-gray-600 mt-2 text-center text-sm md:text-lg">Stay updated with upcoming events</p>
        {loading && <p className="mt-4 text-gray-500 text-center">Loading events...</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4 text-center">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer w-full hover:bg-green-600" onClick={() => handleRegisterClick(event)}>
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-blue-900 text-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Register for {selectedEvent.title}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-[#fff] text-sm font-bold mb-2">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400" placeholder="Enter your full name" />
              </div>
              <div className="mb-4">
                <label className="block text-[#fff] text-sm font-bold mb-2">Registration Number</label>
                <input type="text" name="regno" value={formData.regno} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400" placeholder="Enter your registration number" />
              </div>
              <div className="mb-6">
                <label className="block text-[#fff] text-sm font-bold mb-2">Course</label>
                <input type="text" name="course" value={formData.course} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400" placeholder="Enter your course" />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={handleClosePopup} className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded-full">Cancel</button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer py-2 px-4 rounded-full">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
