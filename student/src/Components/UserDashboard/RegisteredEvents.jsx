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
        setEvents([]); // Clear previous events before fetching new ones

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
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Search Your Registered Events</h2>
            
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter your registration number"
                    value={regno}
                    onChange={(e) => {
                        setRegno(e.target.value);
                        if (error) setError(null); // Clear error when user starts typing
                    }}
                    className="flex-grow p-2 border rounded"
                />
                <button
                    onClick={fetchEvents}
                    disabled={!regno.trim() || loading}
                    className={`px-4 py-2 rounded text-white ${
                        !regno.trim() || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {events.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Your Registered Events</h3>
                    <ul className="mt-2 space-y-4">
                        {events.map((event) => (
                            <li key={event.id} className="p-4 border rounded shadow">
                                <h2 className="text-xl font-bold text-blue-600">{event.title}</h2>
                                <h3 className="font-semibold">{event.name}</h3>
                                <p className="text-sm text-gray-600">{event.date}</p>
                                <p className="text-sm">{event.location}</p>
                                <p className="text-sm">{event.description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {!loading && !error && events.length === 0 && (
                <p className="text-gray-500 mt-4">No registered events found.</p>
            )}
        </div>
    );
};

export default RegisteredEvents;
