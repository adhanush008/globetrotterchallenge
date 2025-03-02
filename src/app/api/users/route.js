// src/app/api/users/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import User from "../../../lib/userModel";

export async function POST(req) {
  await dbConnect();
  const { username } = await req.json();
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ userId: existingUser._id }, { status: 200 });
  }
  const user = new User({ username });
  await user.save();
  return NextResponse.json({ userId: user._id }, { status: 201 });
}