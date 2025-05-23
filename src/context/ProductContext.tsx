import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import type { PropsWithChildren } from 'react';


import type { Product } from '../types/types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (page?: number, category?: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('ProductContext must be used within ProductProvider');
  return ctx;
};

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Added return type Promise<void> for fetchProducts and searchProducts
  const fetchProducts = useCallback(
  async (page?: number, category?: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://zayedserver-332321552cf3.herokuapp.com/products`;
      const params: string[] = [];
      if (page) params.push(`page=${page}`);
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (params.length) url += `?${params.join('&')}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data: Product[] = await res.json();
      setProducts(data);
  } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError(String(err));
  }
}
  },
  []
);


  const searchProducts = useCallback(async (query: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://zayedserver-332321552cf3.herokuapp.com/products/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
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
