export default function ScoreDisplay({ score }) {
    return (
      <div className="mb-4 p-2 bg-gray-200 rounded">
        <p>Score: {score.correct} Correct, {score.incorrect} Incorrect</p>
      </div>
    );
  }