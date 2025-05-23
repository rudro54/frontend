import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const SearchBar: React.FC = () => {
  const { searchProducts } = useProductContext();
  const [q, setQ] = useState('');
  return (
    <form className="mb-4 flex " onSubmit={e => { e.preventDefault(); searchProducts(q); }}>
      <input className="border border-info p-2 flex-grow rounded-l" value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r btn btn-success" type="submit">Search</button>
    </form>
  );
};

export default React.memo(SearchBar);