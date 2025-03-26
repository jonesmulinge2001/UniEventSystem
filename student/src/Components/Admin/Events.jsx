import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  // const navigate = useNavigate();

  // const updateEvent = () =>{
  //   navigate("/add event")
  // }

// getting the events from the backend
 useEffect(() => {
  const fecthEvents = async () => {
    try {
      const myResponse = await fetch("http://localhost:5000/events");
      if(!myResponse.ok){
        throw new Error("Failed to fetch events");
      }
      const myData = await myResponse.json();
      setEvents(myData);
    } catch (error) {
      console.log("Something went wrong while fetching events",error);
    }
  }
  fecthEvents();
 }, [])

// deleting the event from the databse
 const performDelete = async (id) => {
  if(window.confirm("Do you want to delete this event?")){
    try {
      const myRes = await fetch(`http://localhost:5000/events/${id}`,{
        method:"DELETE"
      });

      if(myRes.ok){
        setEvents(events.filter((event)=> event.id !==id)); 
      }
    } catch (error) {
      console.log("Something went wrong while deleting the event",error);
      
    }
  }
 };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold -mt-17 mb-2 text-center">Upcoming Events</h2>
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
              <button  className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
              <button
                onClick={() => performDelete(event.id)}
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
