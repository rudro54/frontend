import React from 'react';
import type { Product } from '../types/types';
import { useNavigate } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h2>
      <p className="text-gray-700">{product.category}</p>
      <div className="flex items-center mb-2">{[...Array(5)].map((_, i) => <span key={i}>{i < product.averageRating ? '⭐️' : '☆'}</span>)}</div>
      {/* <p className="mt-2 text-gray-500">{product.description}</p> */}
    </div>
  );
};

export default React.memo(ProductCard);
