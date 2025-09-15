"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get("/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const chartData = Object.values(
    events.reduce((acc, event) => {
      const loc = event.location || "Unknown";
      acc[loc] = acc[loc] || { location: loc, count: 0 };
      acc[loc].count++;
      return acc;
    }, {})
  );

  if (loading) return <p className="p-4">Loading events...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - All Events</h1>

      <div className="p-4 bg-white shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Event Count by Location</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Organizer</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="px-4 py-2 border">{event.title}</td>
                  <td className="px-4 py-2 border">{event.location}</td>
                  <td className="px-4 py-2 border">{event.date}</td>
                  <td className="px-4 py-2 border">{event.organizer || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
