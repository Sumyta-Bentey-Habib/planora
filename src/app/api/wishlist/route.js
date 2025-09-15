import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json([], { status: 401 });

  const wishlistCollection = await dbConnect("wishlist");
  const items = await wishlistCollection.find({ userId: token.sub }).toArray();
  const eventIds = items.map((item) => item.eventId);
  return NextResponse.json(eventIds);
}

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { eventId } = await req.json();
  const wishlistCollection = await dbConnect("wishlist");
  await wishlistCollection.insertOne({ userId: token.sub, eventId });
  return NextResponse.json({ success: true });
}
