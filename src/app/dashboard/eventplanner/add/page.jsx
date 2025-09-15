"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import axios from "axios";
import uploadImage from "@/lib/uploadImage";

export default function AddEventPage() {
  const [form, setForm] = useState({ title: "", description: "", location: "", time: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadImage(imageFile);

      await axios.post("/api/my-events", { ...form, image: imageUrl });

      Swal.fire("Success", "Event added successfully", "success");
      setForm({ title: "", description: "", location: "", time: "", image: "" });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add event", "error");
    }
  };

  return (
    <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
      <Input placeholder="Title" name="title" value={form.title} onChange={handleChange} />
      <Textarea placeholder="Description" name="description" value={form.description} onChange={handleChange} />
      <Input placeholder="Location" name="location" value={form.location} onChange={handleChange} />
      <Input type="datetime-local" name="time" value={form.time} onChange={handleChange} />
      <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      <Button type="submit">Add Event</Button>
    </form>
  );
}
