export default function GuessForm({ options, onGuess }) {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Guess the Destination:</h2>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onGuess(option)}
            className="block w-full p-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    );
  }