import React, { useState } from 'react';

const SearchForm = ({ onSearch, loading, error }) => {
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [productName, setProductName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchCriteria = {};
    if (category) searchCriteria.Category = category;
    if (company) searchCriteria.Company = company;
    if (productName) searchCriteria.Product = productName;

    onSearch(searchCriteria);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter category"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter company"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="productName">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default SearchForm;
