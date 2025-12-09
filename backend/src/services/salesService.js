const { getSalesData } = require('../utils/dataLoader');

const getSales = (filters, sortBy, sortOrder, page, limit) => {
  const allData = getSalesData(); // Use reference, do not copy

  // Single pass filtering
  const filteredData = allData.filter(sale => {
    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = sale['Customer Name'].toLowerCase().includes(searchLower);
      const matchesPhone = sale['Phone Number'].toString().includes(searchLower);
      if (!matchesName && !matchesPhone) return false;
    }

    // Exact matches (using Set logic or Array.includes is fine for small filter arrays)
    if (filters.customerRegion.length > 0 && !filters.customerRegion.includes(sale['Customer Region'])) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(sale.Gender)) return false;
    if (filters.productCategory.length > 0 && !filters.productCategory.includes(sale['Product Category'])) return false;
    if (filters.paymentMethod.length > 0 && !filters.paymentMethod.includes(sale['Payment Method'])) return false;

    // Range checks
    if (filters.minAge !== undefined && sale.Age < filters.minAge) return false;
    if (filters.maxAge !== undefined && sale.Age > filters.maxAge) return false;

    // Tags (using pre-processed array)
    if (filters.tags.length > 0) {
      // Check if any of the selected tags exist in the sale's tags
      if (!filters.tags.some(tag => sale.TagsList.includes(tag))) return false;
    }

    // Date range - String comparison for "YYYY-MM-DD" is faster than new Date()
    if (filters.startDate && sale.Date < filters.startDate) return false;
    if (filters.endDate && sale.Date > filters.endDate) return false;

    return true;
  });

  // Sorting
  // Create a copy only when sorting to avoid mutating the filtered subset (which is a new array anyway)
  // However, sort is in-place, and filteredData is a new array from filter(), so it is safe to sort it.
  filteredData.sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'date') {
      // String comparison is sufficient for ISO dates
      if (a.Date < b.Date) comparison = -1;
      if (a.Date > b.Date) comparison = 1;
    } else if (sortBy === 'quantity') {
      comparison = a.Quantity - b.Quantity;
    } else if (sortBy === 'customerName') {
      comparison = a['Customer Name'].localeCompare(b['Customer Name']);
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

const getFilterOptions = () => {
  const data = getSalesData();
  // Using Set for uniqueness is O(N), but we can optimize by doing a single pass if needed.
  // For now, let's just use the pre-calculated TagsList.

  const options = {
    customerRegion: [...new Set(data.map(s => s['Customer Region']))].filter(Boolean),
    gender: [...new Set(data.map(s => s.Gender))].filter(Boolean),
    productCategory: [...new Set(data.map(s => s['Product Category']))].filter(Boolean),
    tags: [...new Set(data.flatMap(s => s.TagsList))].filter(Boolean),
    paymentMethod: [...new Set(data.map(s => s['Payment Method']))].filter(Boolean)
  };

  return options;
};

module.exports = {
  getSales,
  getFilterOptions
};
