"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Event Explorer",
    feedback: "Planora made it so easy to find events I love. Highly recommended!",
  },
  {
    name: "Mark Thompson",
    role: "Event Planner",
    feedback: "Managing events has never been easier. The platform is intuitive and reliable.",
  },
  {
    name: "Sophia Lee",
    role: "Explorer",
    feedback: "I discovered amazing local events thanks to Hobby Hood!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent>
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription className="text-gray-500">{t.role}</CardDescription>
              </CardHeader>
              <p className="mt-2">{t.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
