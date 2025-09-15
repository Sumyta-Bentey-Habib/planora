"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  { name: "Emma Watson", rating: 5, comment: "Amazing events! Loved every moment." },
  { name: "John Doe", rating: 4, comment: "Great platform, very user-friendly." },
  { name: "Jane Smith", rating: 5, comment: "I discovered so many fun activities!" },
];

function StarRating({ rating }) {
  return (
    <div className="flex text-yellow-400 mt-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={i < rating ? "w-5 h-5 fill-current" : "w-5 h-5"} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {reviews.map((r, idx) => (
          <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
                <StarRating rating={r.rating} />
              </CardHeader>
              <CardDescription className="mt-2 text-gray-600">{r.comment}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
