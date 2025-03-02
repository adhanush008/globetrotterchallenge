// src/app/api/score/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import User from "../../../lib/userModel";

export async function POST(req) {
  await dbConnect();
  const { userId, correct, incorrect } = await req.json();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  user.correct = correct;
  user.incorrect = incorrect;
  await user.save();
  return NextResponse.json({ message: "Score updated", score: { correct, incorrect } });
}