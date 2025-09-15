"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents(events.filter((e) => e._id !== id));
        Swal.fire("Deleted!", "Event removed.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Events (Admin)</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-gray-600">{event.location} - {event.time}</p>
            {event.image && <img src={event.image} className="w-40 mt-2 rounded" />}
            <Button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white mt-2">Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
