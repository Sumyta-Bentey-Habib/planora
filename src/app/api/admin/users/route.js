import dbconnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  const users = await dbconnect("users");
  const data = await users.find({}).toArray();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

  const users = await dbconnect("users");
  await users.deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { role } = await req.json();
  const users = await dbconnect("users");
  await users.updateOne({ _id: new ObjectId(id) }, { $set: { role } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
