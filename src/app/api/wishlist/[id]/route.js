import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const wishlistCollection = await dbConnect("wishlist");
  await wishlistCollection.deleteOne({ eventId: params.id });
  return NextResponse.json({ success: true });
}
