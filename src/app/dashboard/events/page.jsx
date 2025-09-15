"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", location: "", time: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (res.ok) {
      Swal.fire("Deleted!", "Event has been removed.", "success");
      fetchEvents();
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      Swal.fire("Updated!", "Event updated successfully.", "success");
      setEditing(null);
      fetchEvents();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {events.map((event) => (
        <div key={event._id} className="p-4 bg-white shadow rounded-lg">
          {editing === event._id ? (
            <div className="space-y-2">
              <Input
                defaultValue={event.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                defaultValue={event.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <Input
                defaultValue={event.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <Input
                defaultValue={event.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <Button onClick={() => handleUpdate(event._id)} className="bg-green-600 text-white">
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-gray-600">{event.location} - {event.time}</p>
              {event.image && <img src={event.image} alt={event.title} className="w-40 mt-2 rounded" />}
              <div className="flex gap-2 mt-2">
                <Button onClick={() => setEditing(event._id)} className="bg-blue-500 text-white">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(event._id)} className="bg-red-500 text-white">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
