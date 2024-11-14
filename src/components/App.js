import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';

const App = () => {
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setError(null);
    setProducts([]);

    try {
      const response = await axios.post('https://punsatva.onrender.com/search', searchCriteria);
      setProducts(response.data);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Search</h2>

      <SearchForm
        onSearch={handleSearch}
        loading={loading}
        error={error}
        category={category}
        setCategory={setCategory}
        company={company}
        setCompany={setCompany}
        productName={productName}
        setProductName={setProductName}
      />

      {error && (
        <div className="mt-4 p-4 text-red-600 bg-red-100 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Search Results</h3>
        {loading ? (
          <div className="mt-4">Loading...</div>
        ) : (
          <div>
            {products.length > 0 ? (
              <ul className="space-y-4">
                {products.map((product, index) => (
                  <li key={index} className="p-4 border rounded-md shadow-md">
                    <strong className="text-gray-800">Category:</strong> {product.Category}, 
                    <strong className="text-gray-800"> Company:</strong> {product.Company}, 
                    <strong className="text-gray-800"> Product Name:</strong> {product.Product_Name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
