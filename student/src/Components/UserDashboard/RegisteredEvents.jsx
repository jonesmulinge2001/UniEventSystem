import React, { useState } from "react";

const RegisteredEvents = () => {
    const [events, setEvents] = useState([]);
    const [regno, setRegno] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        if (!regno.trim()) {
            setError("Please enter your registration number.");
            return;
        }

        setLoading(true);
        setError(null);
        setEvents([]);

        try {
            const response = await fetch(`http://localhost:5000/user-events/${regno}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error fetching events");
            }

            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message || "Error fetching events. Please try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="p-6 mx-auto bg-white shadow-lg rounded-lg flex-1 lg:ml-64 md:ml-56 sm:ml-16"> 
            <h2 className="text-2xl sm:text-xl font-semibold mb-6 text-center text-gray-600">
                Search Your Registered Events
            </h2>

            {/* Search Input & Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center w-full">
                <input
                    type="search"
                    placeholder="Enter registration number"
                    value={regno}
                    onChange={(e) => {
                        setRegno(e.target.value);
                        if (error) setError(null);
                    }}
                    className="w-full sm:w-3/4 p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={fetchEvents}
                    disabled={!regno.trim() || loading}
                    className={`w-full sm:w-auto px-6 py-2 text-xs sm:text-base rounded-lg text-white transition-all ${
                        !regno.trim() || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display Events */}
            {events.length > 0 ? (
                <>
                    <h3 className="text-lg sm:text-base font-semibold mt-2 mb-2 text-center">
                        Your Registered Events
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {events.map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition">
                                <h2 className="text-lg font-bold text-blue-600">{event.title}</h2>
                                <p className="text-sm text-gray-700 font-semibold">{event.name}</p>
                                <p className="text-xs text-gray-600">{event.date}</p>
                                <p className="text-xs">{event.location}</p>
                                <p className="text-xs text-gray-600">{event.description}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                !loading && !error && <p className="text-gray-500 text-center mt-4">No registered events found.</p>
            )}
        </div>
    );
};

export default RegisteredEvents;
