import React, { useState } from 'react';
import { useReviewContext } from '../context/ReviewContext';
import ReviewForm from './ReviewForm';

const ReviewList: React.FC<{ productId: number }> = ({ productId }) => {
  const { reviews, loading, error, fetchReviews, deleteReview } = useReviewContext();
  const [editId, setEditId] = useState<number | null>(null);

  React.useEffect(() => { fetchReviews(productId); }, [fetchReviews, productId]);
  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="font-bold text-lg mt-4 mb-2">Reviews</h3>
      {reviews.length === 0 && <div>No reviews yet.</div>}
      <ul>
        {reviews.map(review => (
          <li key={review.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <span className="font-semibold">{review.author}</span> {' '}
              <span>{[...Array(5)].map((_, i) => <span key={i}>{i < review.rating ? '⭐️' : '☆'}</span>)}</span>
              <div>{review.comment}</div>
              <div className="text-gray-400 text-xs">{new Date(review.date).toLocaleString()}</div>
            </div>
            <div>
              <button className=" btn btn-success text-sm text-blue-500 ml-2" onClick={() => setEditId(review.id)}>Edit</button>
              <button className=" btn btn-danger text-sm text-red-500 ml-2" onClick={() => deleteReview(productId, review.id)}>Delete</button>
            </div>
            {editId === review.id && (
              <ReviewForm productId={productId} initialReview={review} onClose={() => setEditId(null)} />
            )}
          </li>
        ))}
      </ul>
      {/* Show add-new form only when not editing any review */}
      {editId === null && <ReviewForm productId={productId} />}
    </div>
  );
};

export default React.memo(ReviewList);
