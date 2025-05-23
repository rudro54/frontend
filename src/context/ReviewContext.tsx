import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Review } from '../types/types';

interface ReviewContextType {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  fetchReviews: (productId: number) => void;
  addReview: (productId: number, review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  editReview: (productId: number, id: number, review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  deleteReview: (productId: number, id: number) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviewContext = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('ReviewContext must be used within ReviewProvider');
  return ctx;
};

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      setReviews(await res.json());
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  const addReview = useCallback(async (productId: number, review: Omit<Review, 'id' | 'date'>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!res.ok) throw new Error('Failed to add review');
      await fetchReviews(productId);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [fetchReviews]);

  const editReview = useCallback(async (productId: number, id: number, review: Omit<Review, 'id' | 'date'>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!res.ok) throw new Error('Failed to edit review');
      await fetchReviews(productId);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [fetchReviews]);

  const deleteReview = useCallback(async (productId: number, id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      await fetchReviews(productId);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [fetchReviews]);

  return (
    <ReviewContext.Provider value={{ reviews, loading, error, fetchReviews, addReview, editReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
};