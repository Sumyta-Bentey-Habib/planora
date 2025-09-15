"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import axios from "axios";

export default function ExplorerDashboard() {
  const [events, setEvents] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch all events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get("/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();

    // Fetch user's wishlist
    async function fetchWishlist() {
      try {
        const res = await axios.get("/api/wishlist");
        setWishlist(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWishlist();
  }, []);

  const toggleWishlist = async (eventId) => {
    try {
      if (wishlist.includes(eventId)) {
        // Remove from wishlist
        await axios.delete(`/api/wishlist/${eventId}`);
        setWishlist(wishlist.filter((id) => id !== eventId));
        Swal.fire("Removed", "Event removed from wishlist", "success");
      } else {
        // Add to wishlist
        await axios.post(`/api/wishlist`, { eventId });
        setWishlist([...wishlist, eventId]);
        Swal.fire("Added", "Event added to wishlist", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update wishlist", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Explorer Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 && <p className="text-gray-500">No events available.</p>}

        {events.map((event) => (
          <div key={event._id} className="p-4 bg-white shadow rounded-lg flex flex-col">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              📍 {event.location} | 🕒 {event.time ? new Date(event.time).toLocaleString() : "-"}
            </p>
            {event.image && (
              <img src={event.image} alt={event.title} className="w-full mt-2 rounded" />
            )}
            <Button
              variant={wishlist.includes(event._id) ? "destructive" : "outline"}
              className="mt-2"
              onClick={() => toggleWishlist(event._id)}
            >
              {wishlist.includes(event._id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
