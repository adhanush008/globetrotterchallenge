// src/components/ClueDisplay.js
export default function ClueDisplay({ clues }) {
    return (
      <div className="mb-4 p-4 bg-gray-200 rounded">
        <h2 className="text-lg font-semibold">Clues:</h2>
        <ul className="list-disc pl-5">
          {clues && Array.isArray(clues) ? (
            clues.map((clue, index) => (
              <li key={index}>{clue}</li>
            ))
          ) : (
            <li>No clues available</li>
          )}
        </ul>
      </div>
    );
  }