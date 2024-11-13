import React, { useState } from 'react';
import axios from 'axios';
import './EnhancedSearch.css';

function EnhancedSearch() {
  // State for user inputs and search results
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new search
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/search', {
        category: category || undefined,
        company: company || undefined,
        productName: productName || undefined,
      });
      setProducts(response.data);
    } catch (err) {
      setError('An error occurred while fetching the data. Please try again.');
      setProducts([]); // Clear products in case of error
    } finally {
      setIsLoading(false);
    }
  };

  // Render skeletons for loading state
  const renderSkeletons = () => (
    <div className="results-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="product-card skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      ))}
    </div>
  );

  // Render product search results
  const renderResults = () => (
    <div className="results-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p><span>Category:</span> {product.category}</p>
          <p><span>Company:</span> {product.company}</p>
          <p className="price">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <div className="search-card">
        <h2 className="search-title">Product Search</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-inputs">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                placeholder="Enter company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search Products'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? renderSkeletons() : products.length > 0 ? renderResults() : (
        !error && <div className="no-results">No products found. Try adjusting your search criteria.</div>
      )}
    </div>
  );
}

export default EnhancedSearch;
