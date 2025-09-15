"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import uploadImage from "@/lib/uploadImage";

export default function EventPlannerEvents() {
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Fetch events on load
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get("/api/my-events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  // Create new event
  // const createEvent = async () => {
  //   if (!newTitle.trim()) return;

  //   const { isConfirmed } = await Swal.fire({
  //     title: "Create new event?",
  //     text: newTitle,
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, create",
  //   });

  //   if (!isConfirmed) return;

  //   try {
  //     const res = await axios.post("/api/my-events", { title: newTitle });
  //     setEvents([...events, res.data]);
  //     setNewTitle("");
  //     Swal.fire("Created!", "Event has been created.", "success");
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire("Error", "Failed to create event.", "error");
  //   }
  // };

  // Delete event
  const deleteEvent = async (id, title) => {
    const { isConfirmed } = await Swal.fire({
      title: `Delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/my-events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      Swal.fire("Deleted!", "Event removed.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete event.", "error");
    }
  };

  // Edit event with SweetAlert modal
  const editEvent = async (event) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Event",
        html: `
          <input id="swal-title" class="swal2-input" placeholder="Title" value="${event.title}" />
          <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${event.description || ""}</textarea>
          <input id="swal-location" class="swal2-input" placeholder="Location" value="${event.location || ""}" />
          <input id="swal-time" type="datetime-local" class="swal2-input" value="${event.time ? new Date(event.time).toISOString().slice(0,16) : ""}" />
          <input id="swal-image" type="file" class="swal2-file" />
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => {
          const title = document.getElementById("swal-title").value;
          const description = document.getElementById("swal-description").value;
          const location = document.getElementById("swal-location").value;
          const time = document.getElementById("swal-time").value;
          const fileInput = document.getElementById("swal-image");

          let imageUrl = event.image || "";

          if (fileInput.files.length > 0) {
            imageUrl = await uploadImage(fileInput.files[0]);
          }

          return { title, description, location, time, image: imageUrl };
        },
      });

      if (!formValues) return;

      await axios.put(`/api/my-events/${event._id}`, formValues);

      setEvents((prev) =>
        prev.map((e) => (e._id === event._id ? { ...e, ...formValues } : e))
      );

      Swal.fire("Updated!", "Your event has been updated.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update event.", "error");
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Create Event */}
      {/* <div className="flex gap-2 mb-6 max-w-lg">
        <Input
          placeholder="New event title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={createEvent}
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Create
        </Button>
      </div> */}

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 && (
          <p className="text-gray-500">No events yet.</p>
        )}

        {events.map((event) => (
          <Card key={event._id} className="shadow-md">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{event.title}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => editEvent(event)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteEvent(event._id, event.title)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-600">
                📍 {event.location} | 🕒 {event.time ? new Date(event.time).toLocaleString() : "-"}
              </p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full mt-2 rounded"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
