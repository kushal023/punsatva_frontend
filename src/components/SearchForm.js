import React from 'react';
import { FaTag, FaBuilding, FaBoxOpen } from 'react-icons/fa';

const SearchForm = ({
  onSearch,
  loading,
  error,
  category,
  setCategory,
  company,
  setCompany,
  productName,
  setProductName,
}) => {
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
        <label className="block text-gray-700 font-semibold mb-2 flex items-center" htmlFor="category">
          <FaTag className="mr-2" /> Category
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
        <label className="block text-gray-700 font-semibold mb-2 flex items-center" htmlFor="company">
          <FaBuilding className="mr-2" /> Company
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
        <label className="block text-gray-700 font-semibold mb-2 flex items-center" htmlFor="product-name">
          <FaBoxOpen className="mr-2" /> Product Name
        </label>
        <input
          id="product-name"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;
