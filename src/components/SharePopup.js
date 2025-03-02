export default function SharePopup({ onClose, username, score }) {
    const shareLink = `https://globetrotter-challenge.vercel.app/game?invitedBy=${username}&score=${score.correct}`;
  
    const handleShare = () => {
      const whatsappUrl = `https://wa.me/?text=Join%20me%20in%20the%20Globetrotter%20Challenge!%20My%20score%20is%20${score.correct}.%20Play%20here:%20${shareLink}`;
      window.open(whatsappUrl, "_blank");
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Challenge a Friend</h2>
          <p>Your score: {score.correct} Correct</p>
          <img src="/images/default-landmark.jpg" alt="Challenge" className="mt-2 w-full h-32 object-cover rounded" />
          <button
            onClick={handleShare}
            className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Share on WhatsApp
          </button>
          <button
            onClick={onClose}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }