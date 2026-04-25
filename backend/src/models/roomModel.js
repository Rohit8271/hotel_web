const supabase = require('../config/supabase');

/**
 * Fetch all rooms with optional filters.
 * @param {object} filters - { type, minPrice, maxPrice }
 */
const getAllRooms = async (filters = {}) => {
  let query = supabase.from('rooms').select('*');

  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  if (filters.minPrice) {
    query = query.gte('price', Number(filters.minPrice));
  }
  if (filters.maxPrice) {
    query = query.lte('price', Number(filters.maxPrice));
  }

  const { data, error } = await query.order('id', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

/**
 * Fetch a single room by ID.
 * @param {number} id
 */
const getRoomById = async (id) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

module.exports = { getAllRooms, getRoomById };
