import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const eventsCollection = await dbConnect("events");
    const myEventsCollection = await dbConnect("my-events");

   
    const events = await eventsCollection.find().toArray();
    const myEvents = await myEventsCollection.find().toArray();

   
    const allEvents = [...events, ...myEvents];

    console.log("Fetched all events:", allEvents);
    return NextResponse.json(allEvents);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
