import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import { getDestinationModel } from "../../../lib/destinationModel";

export async function GET() {
  await dbConnect();
  const Destination = await getDestinationModel();
  const count = await Destination.countDocuments();
  const random = Math.floor(Math.random() * count);
  const destination = await Destination.findOne().skip(random);
  return NextResponse.json(destination);
}

// Function to populate initial data (run once or via script)
export async function POST(req) {
  await dbConnect();
  const Destination = await getDestinationModel();
  const { destinations } = await req.json();
  await Destination.insertMany(destinations);
  return NextResponse.json({ message: "Destinations added" });
}