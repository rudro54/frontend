import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ReviewList from '../components/ReviewList';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductContext();
  const navigate = useNavigate();
  debugger;
  const product = products.find(p => p.id == Number(id));
  if (!product) return <div>Product not found</div>;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <button className="btn btn-primary mb-4 text-blue-500 underline" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <div className="flex items-center">{[...Array(5)].map((_, i) => <span key={i}>{i < product.averageRating ? '⭐️' : '☆'}</span>)} <span className="ml-2 text-gray-600">({product.category})</span></div>
      {/* <div className="mt-1 text-lg">${product.price.toFixed(2)}</div>
      <div className="text-gray-600 mt-2">{product.description}</div> */}
      <ReviewList productId={product.id} />
    </div>
  );
};

export default ProductDetail;