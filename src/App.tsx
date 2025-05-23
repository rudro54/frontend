import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { ReviewProvider } from './context/ReviewContext';
import ProductList from './components/ProductList';
import ProductDetail from './pages/ProductDetail';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

const App: React.FC = () => (
      <ProductProvider>
      <ReviewProvider>
  <BrowserRouter>

        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold mb-4">Product Review & Rating Platform</h1>
          <SearchBar />
          <CategoryFilter />
          
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>

  </BrowserRouter>
        </ReviewProvider>
    </ProductProvider>
);

export default App;


