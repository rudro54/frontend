import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (page?: number, category?: string) => void;
  searchProducts: (query: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('ProductContext must be used within ProductProvider');
  return ctx;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (page = 1, category = '') => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://zayedserver-332321552cf3.herokuapp.com/products`;
      if (category) url += `/?category=${category}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      let data = await res.json()
      if (category){
      data = data.filter(d => d.category == category)
    }
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://zayedserver-332321552cf3.herokuapp.com/products/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      setProducts(await res.json());
 } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError(String(err));
  }
}

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};