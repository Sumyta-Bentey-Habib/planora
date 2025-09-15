"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AOS from "aos";
import "aos/dist/aos.css";

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

    // Initialize AOS
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });
  }, []);

  const firstThree = events.slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2
        className="text-3xl font-bold text-center mb-8 text-purple-800"
        data-aos="fade-up"
      >
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {firstThree.map((event, idx) => (
          <Card
            key={event._id}
            className="overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
            data-aos="zoom-in"
            data-aos-delay={idx * 150}
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-700">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {event.location}
                </CardDescription>
              </CardHeader>
              <p className="mt-2 text-gray-600">{event.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length > 3 && (
        <div className="mt-8 text-center" data-aos="fade-up">
          {session ? (
            <a
              href="/events"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
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
