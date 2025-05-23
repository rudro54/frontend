import React, { useMemo } from 'react';
import { useProductContext } from '../context/ProductContext';

const CategoryFilter: React.FC = () => {
  const { products, fetchProducts } = useProductContext();

  // Dynamically collect unique categories from the product list
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set).sort()];
  }, [products]);
  return (
    <div className="flex gap-2 mb-4">
      {categories.map(cat => (
        <button key={cat} className="px-3 py-1 border rounded" onClick={() => fetchProducts(1, cat === 'All' ? '' : cat)}>{cat}</button>
      ))}
    </div>
  );
};

export default React.memo(CategoryFilter);