const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) return '/api';
  if (url.endsWith('/api')) return url;
  return `${url}/api`;
};

const API_BASE_URL = getBaseUrl();

export const fetchSales = async (params) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.append(key, value.join(','));
      } else if (!Array.isArray(value)) {
        queryParams.append(key, value);
      }
    }
  });

  const response = await fetch(`${API_BASE_URL}/sales?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch sales');
  return response.json();
};

export const fetchFilterOptions = async () => {
  const response = await fetch(`${API_BASE_URL}/filter-options`);
  if (!response.ok) throw new Error('Failed to fetch filter options');
  return response.json();
};
