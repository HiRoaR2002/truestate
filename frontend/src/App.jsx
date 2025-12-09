import React from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import { useSales } from './hooks/useSales';

function App() {
  const {
    sales,
    pagination,
    loading,
    filterOptions,
    filters,
    sortBy,
    sortOrder,
    currentPage,
    updateFilter,
    clearFilters,
    setSortBy,
    setSortOrder,
    setCurrentPage
  } = useSales();

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Retail Sales Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search and Sort */}
            <div className="flex gap-4">
              <div className="flex-1">
                <SearchBar
                  value={filters.search}
                  onChange={(value) => updateFilter('search', value)}
                />
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="quantity-desc">Quantity (High to Low)</option>
                <option value="quantity-asc">Quantity (Low to High)</option>
                <option value="customerName-asc">Customer Name (A-Z)</option>
                <option value="customerName-desc">Customer Name (Z-A)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {pagination.totalItems || 0} results found
            </div>

            {/* Sales Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <SalesTable sales={sales} loading={loading} />
            </div>

            {/* Pagination */}
            {pagination.totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
