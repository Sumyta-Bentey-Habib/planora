"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function ExplorerPage() {
  const [events, setEvents] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchEvents = async () => {
    const ev = await axios.get("/api/events");
    setEvents(ev.data);

    const wl = await axios.get("/api/wishlist");
    setWishlist(wl.data); 
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleWishlist = async (event) => {
    if (wishlist.includes(event._id)) {
      await axios.delete(`/api/wishlist/${event._id}`); // FIX: delete by eventId
      Swal.fire("Removed!", "Event removed from wishlist", "info");
    } else {
      await axios.post("/api/wishlist", { eventId: event._id });
      Swal.fire("Added!", "Event added to wishlist", "success");
    }
    fetchEvents();
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="p-4 bg-white shadow rounded-lg flex flex-col"
        >
          {event.image && (
            <img
              src={event.image}
              className="h-40 object-cover rounded mb-2"
              alt={event.title}
            />
          )}
          <h3 className="font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.description}</p>
          <Button
            onClick={() => toggleWishlist(event)}
            className="mt-2 flex items-center gap-2"
          >
            <Heart size={18} />{" "}
            {wishlist.includes(event._id) ? "Remove" : "Add to Wishlist"}
          </Button>
        </div>
      ))}
    </div>
  );
}
