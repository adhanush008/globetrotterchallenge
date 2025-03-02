// src/lib/destinationModel.js
import mongoose from "mongoose";
import dbConnect from "./db";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clues: [{ type: String, required: true }],
  funFact: { type: String, required: true },
});

let Destination;

export async function getDestinationModel() {
  if (Destination) return Destination;

  await dbConnect(); // Ensure MongoDB is connected
  Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);
  return Destination;
}

export default getDestinationModel;