import React from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { products, loading, error } = useProductContext();
  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

export default React.memo(ProductList);