"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; 

export default function HomeEvents() {
  const [events, setEvents] = useState([]);
  const { data: session } = useSession();

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

  const firstThree = events.slice(0, 3);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {firstThree.map((event) => (
          <Card key={event._id} className="overflow-hidden shadow-lg">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.location}</CardDescription>
              </CardHeader>
              <p className="mt-2 text-gray-500">{event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length > 3 && (
        <div className="mt-6 text-center">
          {session ? (
            <a
              href="/events"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              See More
            </a>
          ) : (
            <p className="text-gray-500">Login to see more events</p>
          )}
        </div>
      )}
    </div>
  );
}
