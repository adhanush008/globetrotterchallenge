import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", userSchema);