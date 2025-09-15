import dbconnect from "@/lib/dbConnect";
import axios from "axios";

export async function GET() {
  try {
    const explorations = await dbconnect("explorations");
    const data = await explorations.find({}).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, imageBase64 } = await req.json();
    if (!title || !description) return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });

    let imageUrl = null;
    if (imageBase64) {
      const form = new FormData();
      form.append("image", imageBase64);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      imageUrl = response.data.data.url;
    }

    const collection = await dbconnect("explorations");
    const result = await collection.insertOne({ title, description, image: imageUrl, createdAt: new Date() });

    return new Response(JSON.stringify({ success: true, item: result }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const collection = await dbconnect("explorations");
    await collection.deleteOne({ _id: new (require("mongodb").ObjectId)(id) });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
