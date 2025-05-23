import React, { useState, useEffect } from 'react';
import { useReviewContext } from '../context/ReviewContext';
import type { Review } from '../types/types';

interface ReviewFormProps {
  productId: number;
  initialReview?: Review;
  onClose?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, initialReview, onClose }) => {
  const { addReview, editReview } = useReviewContext();
  const [author, setAuthor] = useState(initialReview?.author || '');
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [comment, setComment] = useState(initialReview?.comment || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialReview) {
      setAuthor(initialReview.author);
      setRating(initialReview.rating);
      setComment(initialReview.comment);
    }
  }, [initialReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!author || !comment) {
      setError('Name and comment are required');
      return;
    }
    setSubmitting(true);
    try {
      if (initialReview) {
        // Edit mode
        await editReview(productId, initialReview.id, { author, rating, comment, productId });
        onClose && onClose();
      } else {
        // Add mode
        await addReview(productId, { author, rating, comment, productId });
        setAuthor('');
        setRating(5);
        setComment('');
      }
    } catch {
      setError('Failed to submit review');
    }
    setSubmitting(false);
  };

  return (
    <form className="mt-4 space-y-2 bg-gray-50 p-2 rounded" onSubmit={handleSubmit}>
      <div>
        <input className="border p-1 rounded w-full" placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <select className="border p-1 rounded" value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Star{v > 1 && 's'}</option>)}
        </select>
      </div>
      <div>
        <textarea className="border p-1 rounded w-full" placeholder="Your review" value={comment} onChange={e => setComment(e.target.value)} />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button type="submit" className=" btn btn-success bg-blue-500 text-white px-3 py-1 rounded" disabled={submitting}>{initialReview ? 'Update' : 'Submit'}</button>
        {initialReview && onClose && <button type="button" className=" btn btn-info bg-gray-300 text-black px-3 py-1 rounded" onClick={onClose}>Cancel</button>}
      </div>
    </form>
  );
};

export default React.memo(ReviewForm);
