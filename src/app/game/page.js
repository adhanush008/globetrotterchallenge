"use client";

import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import ClueDisplay from "../../components/ClueDisplay";
import GuessForm from "../../components/GuessForm";
import Feedback from "../../components/Feedback";
import ScoreDisplay from "../../components/ScoreDisplay";

export default function Game() {
  const [destination, setDestination] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer
  const [wrongAnswers, setWrongAnswers] = useState(0); // Limit of 3 wrong answers
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const cookies = getCookies();
    const storedUserId = cookies.userId || null;
    setUserId(storedUserId);
    loadNewDestination();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const loadNewDestination = async () => {
    if (gameOver) return; // Prevent loading new destinations after game over
    setIsLoading(true);
    try {
      console.log("Fetching destination from API...");
      const response = await fetch("/api/destinations");
      if (!response.ok) throw new Error(`Failed to fetch destination: ${response.status}`);
      const data = await response.json();
      console.log("Fetched destination data:", data);
      if (!data || (!data.name && !data.imageUrl && !data.funFact)) {
        console.error("No valid destination data received");
        setDestination(null);
      } else {
        setDestination(data);
        setWrongAnswers(0); // Reset wrong answers for new destination
      }
    } catch (error) {
      console.error("Error loading destination:", error);
      setDestination(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = async (guess) => {
    if (gameOver) return; // Prevent guesses after game over
    console.log("Guessing:", guess, "Correct destination:", destination?.name);
    if (guess === destination?.name) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({
        type: "correct",
        message: "Correct! 🎉",
        fact: destination.funFact,
      });
      await updateUserScore(userId, score.correct + 1, score.incorrect);
    } else {
      const newWrongAnswers = wrongAnswers + 1;
      setWrongAnswers(newWrongAnswers);
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setFeedback({
        type: "incorrect",
        message: "Oops! 😔",
        fact: destination.funFact,
      });
      await updateUserScore(userId, score.correct, score.incorrect + 1);
      if (newWrongAnswers >= 3) {
        setGameOver(true);
      }
    }
  };

  const updateUserScore = async (userId, correct, incorrect) => {
    if (!userId) return;
    try {
      await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, correct, incorrect }),
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  const handleShare = () => {
    alert("Share feature to be implemented - use SharePopup component");
  };

  const restartGame = () => {
    setDestination(null);
    setScore({ correct: 0, incorrect: 0 });
    setFeedback(null);
    setIsLoading(true);
    setTimeLeft(60);
    setWrongAnswers(0);
    setGameOver(false);
    loadNewDestination();
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Guess the Destination!</h1>
      <p>Time Left: {timeLeft}s | Wrong Answers: {wrongAnswers}/3</p>
      <ScoreDisplay score={score} />
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p>Your Final Score: {score.correct} Correct, {score.incorrect} Incorrect</p>
          <button
            onClick={restartGame}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Restart Game
          </button>
        </div>
      ) : destination ? (
        <>
          <ClueDisplay imageUrl={destination.imageUrl} />
          <GuessForm
            options={[destination.name, "Paris", "New York", "Tokyo"].sort(() => Math.random() - 0.5)}
            onGuess={handleGuess}
          />
          {feedback && (
            <Feedback
              type={feedback.type}
              message={feedback.message}
              fact={feedback.fact}
              onNext={loadNewDestination}
            />
          )}
          <button
            onClick={handleShare}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Challenge a Friend
          </button>
        </>
      ) : (
        <p className="text-red-500">No destination data available. Please check the database or API.</p>
      )}
    </div>
  );
}