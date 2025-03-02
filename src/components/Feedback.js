export default function Feedback({ type, message, fact, onNext }) {
    return (
      <div className={`p-4 rounded ${type === "correct" ? "bg-green-100" : "bg-red-100"}`}>
        <p className="font-semibold">{message}</p>
        <p className="mt-2">Fun Fact: {fact}</p>
        {type === "correct" ? (
          <div className="confetti-animation mt-2">
            {/* CSS animation for confetti (Tailwind classes or custom CSS) */}
            <style jsx>{`
              .confetti-animation {
                position: relative;
                animation: confetti 2s ease-out;
              }
              @keyframes confetti {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }
            `}</style>
          </div>
        ) : (
          <div className="sad-face-animation mt-2">
            {/* CSS animation for sad face */}
            <style jsx>{`
              .sad-face-animation {
                position: relative;
                animation: sadFace 1s ease-in-out;
              }
              @keyframes sadFace {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            `}</style>
          </div>
        )}
        <button
          onClick={onNext}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {type === "correct" ? "Play Again" : "Next"}
        </button>
      </div>
    );
  }