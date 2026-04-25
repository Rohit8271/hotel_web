import api from './axiosInstance';

/**
 * Fetch all rooms with optional filters.
 * @param {object} params - { type, minPrice, maxPrice }
 */
export const fetchRooms = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)
  );
  const { data } = await api.get('/rooms', { params: cleanParams });
  return data;
};
