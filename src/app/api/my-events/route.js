import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await dbConnect("my-events");
  const data = await events.find().toArray();
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const events = await dbConnect("my-events");
  const result = await events.insertOne(body);
  return NextResponse.json(result);
}