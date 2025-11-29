import { useState, useEffect } from 'react';

function ReviewModal({ favorite, onSave, onClose }) {
  const [review, setReview] = useState(favorite.review || '');
  const [rating, setRating] = useState(favorite.rating || 5);

  useEffect(() => {
    setReview(favorite.review || '');
    setRating(favorite.rating || 5);
  }, [favorite]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(review, rating);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2f3136] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Write a Review</h2>
              <p className="text-gray-400 mt-1">{favorite.title} ({favorite.year})</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Your Rating: {rating}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full h-2 bg-[#202225] rounded-lg appearance-none cursor-pointer accent-[#5865f2]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 (Poor)</span>
                <span>10 (Excellent)</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Your Review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts about this movie..."
                rows="6"
                className="w-full px-4 py-3 bg-[#202225] text-white rounded-lg border border-[#40444b] focus:border-[#5865f2] focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg transition-colors font-medium"
              >
                Save Review
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#4f545c] hover:bg-[#5d6269] text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
