import { useState, useEffect } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api';

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    customerRegion: [],
    gender: [],
    productCategory: [],
    tags: [],
    paymentMethod: []
  });

  const [filters, setFilters] = useState({
    search: '',
    customerRegion: [],
    gender: [],
    minAge: '',
    maxAge: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    startDate: '',
    endDate: ''
  });

  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadSales();
  }, [filters, sortBy, sortOrder, currentPage]);

  const loadFilterOptions = async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const loadSales = async () => {
    setLoading(true);
    try {
      const result = await fetchSales({
        ...filters,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 10
      });
      setSales(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      customerRegion: [],
      gender: [],
      minAge: '',
      maxAge: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      startDate: '',
      endDate: ''
    });
    setCurrentPage(1);
  };

  return {
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
  };
};
