import React from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ filters, filterOptions, onFilterChange, onClearFilters }) => {
  const handleMultiSelect = (filterName, value) => {
    const current = filters[filterName] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange(filterName, updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {/* Customer Region */}
        <div>
          <label className="block text-sm font-medium mb-2">Customer Region</label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {filterOptions.customerRegion.map(region => (
              <label key={region} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.customerRegion?.includes(region) || false}
                  onChange={() => handleMultiSelect('customerRegion', region)}
                  className="rounded"
                />
                {region}
              </label>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="space-y-1">
            {filterOptions.gender.map(gender => (
              <label key={gender} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.gender?.includes(gender) || false}
                  onChange={() => handleMultiSelect('gender', gender)}
                  className="rounded"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minAge || ''}
              onChange={(e) => onFilterChange('minAge', e.target.value)}
              className="w-full px-3 py-1 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxAge || ''}
              onChange={(e) => onFilterChange('maxAge', e.target.value)}
              className="w-full px-3 py-1 border rounded"
            />
          </div>
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Category</label>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {filterOptions.productCategory.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.productCategory?.includes(cat) || false}
                  onChange={() => handleMultiSelect('productCategory', cat)}
                  className="rounded"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="space-y-1">
            {filterOptions.paymentMethod.map(method => (
              <label key={method} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.paymentMethod?.includes(method) || false}
                  onChange={() => handleMultiSelect('paymentMethod', method)}
                  className="rounded"
                />
                {method}
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-1 border rounded"
            />
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-1 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
