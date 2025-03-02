"use client";

import { useState } from "react";
import { setCookie } from "cookies-next"; // Install with `npm install cookies-next`

export default function Home() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleStart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) throw new Error("Failed to register user");
      const data = await response.json();
      setCookie("userId", data.userId, { path: "/" }); // Set cookie for persistence
      window.location.href = "/game";
    } catch {
      setError("Error registering user. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Globetrotter Challenge</h1>
        <form onSubmit={handleStart} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}